import { Chain, AssetConfig, ChainInfo } from "@axelar-network/axelarjs-sdk";
import memoize from "proxy-memoize";
import create, { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { ASSET_RESTRICTIONS, ENVIRONMENT } from "../config/constants";
import { NativeAssetConfig } from "../config/nativeAssetList/testnet";
import { getWagmiChains } from "../config/web3";

import { SwapOrigin, SwapStatus } from "../utils/enums";

const getWagmiChainOverride = (wagmiNetwork: string) => {
  const map: Record<string, string> = {
    ropsten: "ethereum",
    homestead: "ethereum",
    goerli: "ethereum",
  };
  return map[wagmiNetwork] || wagmiNetwork;
};

/**
 * COMPUTED VALUES
 */
export const getSrcChainId = memoize((state: { srcChain: ChainInfo }) => {
  if (!state.srcChain) return undefined;
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      getWagmiChainOverride(_chain.network) ===
      state.srcChain?.chainName.toLowerCase()
  );
  return chain?.id;
});

export const getDestChainId = memoize((state: { destChain: ChainInfo }) => {
  if (!state.destChain) return null;
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      getWagmiChainOverride(_chain.network) ===
      state.destChain?.chainName.toLowerCase()
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

export const getRestrictedAssetIsSelected = memoize(
  (state: { asset: NativeAssetConfig | null }) => {
    const restrictedAssets = ASSET_RESTRICTIONS.map(
      (rule) => rule.assets
    ).flat();
    if (restrictedAssets.includes((state.asset as any)?.id || "")) return true;

    return false;
  }
);

interface TxInfo {
  sourceTxHash?: string;
  destTxHash?: string;
  destStartBlockNumber?: number;
}

interface SwapState {
  allAssets: NativeAssetConfig[];
  allChains: ChainInfo[];
  srcChain: ChainInfo;
  destChain: ChainInfo;
  destAddress: string;
  selectableAssetList: NativeAssetConfig[];
  asset: NativeAssetConfig | null;
  swapStatus: SwapStatus;
  depositAddress: string;
  intermediaryDepositAddress: string;
  swapOrigin: SwapOrigin;
  tokensToTransfer: string;
  txInfo: TxInfo;
  rehydrateAssets: boolean;
}

interface SwapStore extends SwapState {
  setAllAssets: (assets: AssetConfig[]) => void;
  setAllChains: (chains: ChainInfo[]) => void;
  setSrcChain: (chain: ChainInfo) => void;
  setDestChain: (chain: ChainInfo) => void;
  setDestAddress: (address: string) => void;
  setAsset: (asset: AssetConfig | null) => void;
  setAssetList: (assets: AssetConfig[]) => void;
  switchChains: () => void;
  setSwapStatus: (newStatus: SwapStatus) => void;
  setDepositAddress: (address: string) => void;
  setIntermediaryDepositAddress: (address: string) => void;
  setSwapOrigin: (origin: SwapOrigin) => void;
  setTokensToTransfer: (tokens: string) => void;
  setTxInfo: (_txInfo: TxInfo) => void;
  resetState: () => void;
  setRehydrateAssets: (value: boolean) => void;
}

/**
 * We define an initial state for easy state reset if needed
 */
const initialState: SwapState = {
  allAssets: [],
  allChains: [],
  selectableAssetList: [], // list of assets to select from
  srcChain: {} as ChainInfo,
  destChain: {} as ChainInfo,
  asset: null, // asset to transfer
  tokensToTransfer: "", // asset amount to transfer
  destAddress: "", // user owned account to transfer assets to
  depositAddress: "", // axelar generated account where user should deposit his assets
  intermediaryDepositAddress: "",
  swapStatus: SwapStatus.IDLE,
  swapOrigin: SwapOrigin.APP,
  txInfo: {
    sourceTxHash: "",
    destTxHash: "",
    destStartBlockNumber: 1,
  },
  rehydrateAssets: true,
};

export const useSwapStore = create<SwapStore>()(
  devtools((set, get) => ({
    ...initialState,
    setAllAssets: (assets) => {
      set(
        {
          allAssets: assets,
        },
        false,
        "setAllAssets"
      );
    },
    setAllChains: (chains) => {
      set(
        {
          allChains: chains,
        },
        false,
        "setAllChains"
      );
    },
    setSrcChain: (chain) => {
      const allAssets = get().allAssets;
      const currentAsset = get().asset;
      const isAssetSupported = chain?.assets?.find(
        (asset) => asset.common_key === currentAsset?.common_key[ENVIRONMENT]
      );

      const supportedAsset = allAssets.find(
        (asset: AssetConfig) =>
          asset.chain_aliases[chain?.chainName?.toLowerCase()]
      );

      if (!isAssetSupported)
        return set(
          {
            srcChain: chain,
            asset: supportedAsset,
            // asset: allAssets?.find((asset: AssetConfig) => {
            //   const _chain = asset.chain_aliases[chain.chainName.toLowerCase()];
            // }),
          },
          false,
          "setSrcChain"
        );

      set(
        {
          srcChain: chain,
        },
        false,
        "setSrcChain"
      );
    },
    setDestChain: (chain) => {
      const allAssets = get().allAssets;
      const currentAsset = get().asset;
      const isAssetSupported = chain?.assets?.find(
        (asset) => asset.common_key === currentAsset?.common_key[ENVIRONMENT]
      );

      const supportedAsset = allAssets.find(
        (asset: AssetConfig) =>
          asset.chain_aliases[chain?.chainName?.toLowerCase()]
      );

      if (!isAssetSupported)
        return set(
          {
            destChain: chain,
            asset: supportedAsset,
            // asset: allAssets?.find((asset) =>
            //   asset.common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
            // ),
          },
          false,
          "setDestChain"
        );

      set(
        {
          destChain: chain,
        },
        false,
        "setDestChain"
      );
    },
    setDestAddress: (address) =>
      set(
        {
          destAddress: address,
        },
        false,
        "setDestAddress"
      ),
    setAsset: (asset) => {
      set(
        {
          asset,
        },
        false,
        "setAsset"
      );
    },

    setAssetList: (assets) =>
      set(
        {
          selectableAssetList: assets,
        },
        false,
        "setAssetList"
      ),
    switchChains: () =>
      set(
        (state) => ({
          destChain: state.srcChain,
          srcChain: state.destChain,
        }),
        false,
        "switchChains"
      ),
    setDepositAddress: (address) =>
      set(
        () => ({
          depositAddress: address,
        }),
        false,
        "setDepositAddress"
      ),
    setIntermediaryDepositAddress: (address) =>
      set(
        () => ({
          intermediaryDepositAddress: address,
        }),
        false,
        "setIntermediaryDepositAddress"
      ),
    setSwapStatus: (newStatus) =>
      set(
        () => ({
          swapStatus: newStatus,
        }),
        false,
        "setSwapStatus"
      ),
    setSwapOrigin: (origin) =>
      set(
        () => ({
          swapOrigin: origin,
        }),
        false,
        "setSwapOrigin"
      ),
    setTokensToTransfer: (tokens) =>
      set(
        {
          tokensToTransfer: tokens,
        },
        false,
        "setTokensToTransfer"
      ),
    setTxInfo: (_txInfo) =>
      set(
        {
          txInfo: {
            ...get().txInfo,
            ..._txInfo,
          },
        },
        false,
        "setTxInfo"
      ),
    resetState: () =>
      set(
        {
          ...initialState,
          allChains: get().allChains,
          allAssets: get().allAssets,
          selectableAssetList: get().selectableAssetList,
          srcChain: get().srcChain,
          destChain: get().destChain,
          asset: get().allAssets.find((asset) =>
            asset?.common_key[ENVIRONMENT].includes("usdc")
          ),
          rehydrateAssets: true,
        },
        false,
        "resetState"
      ),
    setRehydrateAssets: (value: boolean) =>
      set({
        rehydrateAssets: value,
      }),
  }))
);

/**
 * Store created to avoid hydration issues with wagmi
 * TODO: move to another file
 */
interface WalletState {
  wagmiConnected: boolean;
  keplrConnected: boolean;
  userSelectionForCosmosWallet: "terraStation" | "keplr";
}
const initialWalletState: WalletState = {
  wagmiConnected: false,
  keplrConnected: false,
  userSelectionForCosmosWallet: "keplr",
};

interface WalletStore extends WalletState {
  setWagmiConnected: (state: boolean) => void;
  setKeplrConnected: (state: boolean) => void;
  setUserSelectionForCosmosWallet: (state: "terraStation" | "keplr") => void;
}
export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      ...initialWalletState,
      setWagmiConnected: (wagmiConnected) => set({ wagmiConnected }),
      setKeplrConnected: (keplrConnected) => set({ keplrConnected }),
      setUserSelectionForCosmosWallet: (
        userSelectionForCosmosWallet: "terraStation" | "keplr"
      ) => set({ userSelectionForCosmosWallet }),
    }),
    { name: "walletStore" }
  )
);

interface ApplicationState {
  modalId: string;
}

interface ApplicationStateStore extends ApplicationState {
  setModalId: (state: string) => void;
}

export const useApplicationStateStore = create<ApplicationStateStore>()(
  devtools((set, get) => ({
    modalId: "",
    setModalId: (state) =>
      set(
        {
          modalId: state,
        },
        false,
        "setModalId"
      ),
  }))
);
