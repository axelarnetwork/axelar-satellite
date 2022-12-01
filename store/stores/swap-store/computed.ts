import { AssetConfig, ChainInfo } from "@axelar-network/axelarjs-sdk";
import memoize from "proxy-memoize";
import { ENVIRONMENT } from "../../../config/constants";
import { getWagmiChains } from "../../../config/web3";
import { NativeAssetConfig } from "../../../config/web3/evm/testnet/native-assets";

export const getSrcChainId = memoize((state: { srcChain: ChainInfo }) => {
  if (!state.srcChain) return undefined;
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      getWagmiChainOverride(_chain.networkNameOverride) ===
      state.srcChain?.chainName?.toLowerCase()
  );
  return chain?.id;
});

export const getDestChainId = memoize((state: { destChain: ChainInfo }) => {
  if (!state.destChain) return null;
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      getWagmiChainOverride(_chain.networkNameOverride) ===
      state.destChain?.chainName?.toLowerCase()
  );
  return chain?.id;
});

export const getSrcTokenAddress = memoize(
  (state: { srcChain: ChainInfo; asset: AssetConfig | null }) => {
    if (!state.asset || !state.srcChain) return null;
    const srcChain = state.srcChain;
    const assetCommonKey = state.asset.common_key[ENVIRONMENT];

    const assetInfo = srcChain.assets?.find(
      (_asset) => _asset.common_key === assetCommonKey
    );
    return assetInfo?.tokenAddress || null;
  }
);

export const getReservedAddresses = memoize(
  (state: { allAssets: AssetConfig[] }) => {
    const addresses = state.allAssets?.reduce((a: string[], b: AssetConfig) => {
      return [
        ...a,
        ...Object.values(b.chain_aliases)
          .map((chain) => chain?.tokenAddress || "")
          .filter((data) => data !== ""), // clean
      ];
    }, []);
    return addresses;
  }
);

export const getSelectedAssetSymbol = memoize(
  (state: { asset: AssetConfig | null; srcChain: ChainInfo }) => {
    const chainName = state?.srcChain?.chainName?.toLowerCase();
    if (!chainName) return "";
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) return "";

    return assetInfo?.assetSymbol || "";
  }
);

export const getSelectedAssetName = memoize(
  (state: { asset: AssetConfig | null; srcChain: ChainInfo }) => {
    const chainName = state?.srcChain?.chainName?.toLowerCase();
    if (!chainName) return "";
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) return "";

    return assetInfo?.assetName || "";
  }
);

export const isAXLToken = memoize(
  (state: { asset: AssetConfig | null; srcChain: ChainInfo }) => {
    return state?.asset?.common_key[ENVIRONMENT] === "uaxl";
  }
);

export const getSelectedAssetNameDestChain = memoize(
  (state: { asset: AssetConfig | null; destChain: ChainInfo }) => {
    const chainName = state?.destChain?.chainName?.toLowerCase();
    if (!chainName) return "";
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) return "";

    return assetInfo?.assetName || "";
  }
);

export const getSelectedAssetSymbolDestinationChain = memoize(
  (state: { asset: AssetConfig | null; destChain: ChainInfo }) => {
    const chainName = state?.destChain?.chainName?.toLowerCase();
    if (!chainName) return "";
    const assetInfo = state?.asset?.chain_aliases[chainName];
    if (!assetInfo) return "";

    return assetInfo?.assetSymbol || "";
  }
);

export const getUnwrappedAssetName = memoize(
  (state: {
    asset: NativeAssetConfig | null;
    destChain: ChainInfo;
    srcChain: ChainInfo;
  }) => {
    // return null if not a wrapped asset
    const isWrappedAsset =
      state?.asset?.native_chain === state.destChain?.chainName?.toLowerCase();
    if (!isWrappedAsset) return null;

    // return asset symbol if wrapped asset
    const nativeAsset = state.destChain.assets?.find(
      (asset) =>
        (asset as any).is_native_asset &&
        asset.native_chain === state.destChain?.chainName?.toLowerCase()
    );

    return nativeAsset?.assetSymbol;
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
