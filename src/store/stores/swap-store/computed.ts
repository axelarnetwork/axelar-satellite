import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { ChainInfo as KeplrChainInfo } from "@keplr-wallet/types";
import { memoize } from "proxy-memoize";

import { ASSET_RESTRICTIONS, ENVIRONMENT } from "~/config/constants";
import { getCosmosChains, getWagmiChains } from "~/config/web3";

import { AssetConfigExtended } from "~/types";

// TODO: should be named getWagmiSrcChainId
export const getSrcChainId = memoize((state: { srcChain: ChainInfo }) => {
  if (!state.srcChain) {
    return undefined;
  }
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      getWagmiChainOverride(_chain.networkNameOverride) ===
      state.srcChain?.chainName?.toLowerCase()
  );
  return chain?.id;
});

// useful for extracting the cosmos chain id
export const getDestCosmosChain = memoize(
  (state: { allAssets: AssetConfigExtended[]; destChain: ChainInfo }) => {
    const chain = getCosmosChains(state.allAssets).find(
      (_chain) =>
        _chain.chainIdentifier === state.destChain.chainName?.toLowerCase()
    );
    if (!chain) {
      return null;
    }
    return chain as KeplrChainInfo;
  }
);

export const getDestChainId = memoize((state: { destChain: ChainInfo }) => {
  if (!state.destChain) {
    return null;
  }
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      getWagmiChainOverride(_chain.networkNameOverride) ===
      state.destChain?.chainName?.toLowerCase()
  );
  return chain?.id;
});

export const getSrcTokenAddress = memoize(
  (state: { srcChain: ChainInfo; asset: AssetConfigExtended | null }) => {
    if (!(state.asset && state.srcChain)) {
      return null;
    }
    const srcChain = state.srcChain;
    const assetCommonKey = state.asset.common_key[ENVIRONMENT];

    const assetInfo = srcChain.assets?.find(
      (_asset) => _asset.common_key === assetCommonKey
    );
    return assetInfo?.tokenAddress || null;
  }
);

export const getReservedAddresses = memoize(
  (state: { allAssets: AssetConfigExtended[] }) => {
    const addresses = state.allAssets?.reduce(
      (a: string[], b: AssetConfigExtended) => {
        return [
          ...a,
          ...Object.values(b.chain_aliases)
            .map((chain) => chain?.tokenAddress || "")
            .filter((data) => data !== ""), // clean
        ];
      },
      []
    );
    return addresses;
  }
);

export const getSelectedAssetSymbol = memoize(
  (state: { asset: AssetConfigExtended | null; srcChain: ChainInfo }) => {
    const chainName = state?.srcChain?.chainName?.toLowerCase();
    if (!chainName) {
      return "";
    }
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) {
      return "";
    }

    return assetInfo?.assetSymbol || "";
  }
);

export const getTransferType = memoize(
  (state: {
    asset: AssetConfigExtended | null;
    srcChain: ChainInfo;
    shouldUnwrapAsset: boolean;
    destChain: ChainInfo;
  }): "deposit-address" | "wrap" | "unwrap" => {
    const { asset, srcChain, shouldUnwrapAsset, destChain } = state;

    let transferType: "deposit-address" | "wrap" | "unwrap" = "deposit-address";
    if (!asset) {
      return transferType;
    }
    const assetIsWrappedVersionOfNativeAssetOnDestChain =
      state?.destChain?.nativeAsset &&
      state.destChain.nativeAsset.length > 0 &&
      state.destChain?.nativeAsset.indexOf(asset.id) >= 0;

    if (
      asset.native_chain === srcChain.chainName?.toLowerCase() &&
      asset.is_gas_token
    ) {
      transferType = "wrap";
      // we transfer wrapped asset of native asset belonging to destination chain
    } else if (
      shouldUnwrapAsset &&
      asset.native_chain === destChain.chainName?.toLowerCase() &&
      destChain.module === "evm" &&
      assetIsWrappedVersionOfNativeAssetOnDestChain
    ) {
      transferType = "unwrap";
    } else if (
      asset.native_chain === destChain.chainName?.toLowerCase() &&
      destChain.module === "evm" &&
      asset.is_gas_token
    ) {
      transferType = "unwrap";
    }

    return transferType;
  }
);

export const getSelectedAssetName = memoize(
  (state: { asset: AssetConfigExtended | null; srcChain: ChainInfo }) => {
    const chainName = state?.srcChain?.chainName?.toLowerCase();
    if (!chainName) {
      return "";
    }
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) {
      return "";
    }

    return assetInfo?.assetName || "";
  }
);

export const isAXLToken = memoize(
  (state: { asset: AssetConfigExtended | null; srcChain: ChainInfo }) => {
    return state?.asset?.common_key[ENVIRONMENT] === "uaxl";
  }
);

export const getSelectedAssetNameDestChain = memoize(
  (state: { asset: AssetConfigExtended | null; destChain: ChainInfo }) => {
    const chainName = state?.destChain?.chainName?.toLowerCase();
    if (!chainName) {
      return "";
    }
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) {
      return "";
    }

    return assetInfo?.assetName || "";
  }
);

export const getSelectedAssetSymbolDestinationChain = memoize(
  (state: { asset: AssetConfigExtended | null; destChain: ChainInfo }) => {
    const chainName = state?.destChain?.chainName?.toLowerCase();
    if (!chainName) {
      return "";
    }
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) {
      return "";
    }

    return assetInfo?.assetSymbol || "";
  }
);

export const getSelectedAsssetIsWrapped = memoize(
  (state: {
    asset: AssetConfigExtended | null;
    destChain: ChainInfo;
    srcChain: ChainInfo;
  }): boolean => {
    if (!state.asset) {
      return false;
    }
    const destChainName = state.destChain?.chainName?.toLowerCase();
    const isGasToken = state.asset.is_gas_token; // e.g. is this pure avax/eth/ftm/etc
    const isGlmr =
      state.asset.id.includes("glmr") || state.asset.id.includes("wdev");
    const destChainIsNativeChain = state.asset.native_chain === destChainName;
    const assetIsWrappedVersionOfNativeAssetOnDestChain =
      state?.destChain?.nativeAsset &&
      state.destChain.nativeAsset.length > 0 &&
      state.destChain?.nativeAsset.indexOf(state.asset.id) >= 0;
    return (
      !isGasToken &&
      destChainIsNativeChain &&
      assetIsWrappedVersionOfNativeAssetOnDestChain &&
      !isGlmr
    );
  }
);

export const getUnwrappedAssetSymbol = memoize(
  (state: {
    allAssets: AssetConfigExtended[];
    asset: AssetConfigExtended | null;
    destChain: ChainInfo;
    srcChain: ChainInfo;
  }) => {
    const nativeToken = state.allAssets.find(
      (_asset) =>
        _asset.native_chain === state.destChain.chainName?.toLowerCase() &&
        _asset.is_gas_token
    )?.chain_aliases[state.destChain.chainName?.toLowerCase()];

    return nativeToken?.assetSymbol;
  }
);

export const getWrappedAssetName = memoize(
  (state: {
    allAssets: AssetConfigExtended[];
    asset: AssetConfigExtended | null;
    destChain: ChainInfo;
    srcChain: ChainInfo;
  }) => {
    const { destChain, allAssets } = state;

    const assetFinder = (_asset: AssetConfigExtended) => {
      // asset's native chain is the destination chain
      const isAssetsNativeChain =
        _asset.native_chain === state.destChain.chainName?.toLowerCase();

      // asset is not gas token, e.g. ETH/AVAX/etc, but instead, wrapped version of them, WETH/WAVAX/etc.
      const isNotGasToken = !_asset.is_gas_token;

      // the nativeAsset list in the chain config for the destination chain includes the denom for the wrapped asset
      // this avoids selection of wrapped assets on chains that are not wrapped native (e.g. USDC on Ethereum)
      const assetIsWrappedVersionOfNativeAssetOnDestChain =
        destChain?.nativeAsset &&
        destChain.nativeAsset.length > 0 &&
        destChain?.nativeAsset.indexOf(_asset.id) >= 0;

      return (
        isAssetsNativeChain &&
        isNotGasToken &&
        assetIsWrappedVersionOfNativeAssetOnDestChain
      );
    };

    const wrappedToken =
      allAssets.find(assetFinder)?.chain_aliases[
        destChain.chainName?.toLowerCase()
      ];

    return wrappedToken?.assetSymbol;
  }
);

export const getRestrictedAssetIsSelected = memoize(
  (state: { asset: AssetConfigExtended | null }) => {
    const restrictedAssets = ASSET_RESTRICTIONS.flatMap((rule) => rule.assets);
    if (restrictedAssets.includes(state.asset?.id || "")) {
      return true;
    }

    return false;
  }
);

const getWagmiChainOverride = (wagmiNetwork: string) => {
  const map: Record<string, string> = {
    ropsten: "ethereum",
    homestead: "ethereum",
    goerli: "ethereum",
  };
  return map[wagmiNetwork] || wagmiNetwork;
};
