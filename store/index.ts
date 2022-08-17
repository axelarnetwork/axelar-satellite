import { Chain, AssetConfig, ChainInfo } from "@axelar-network/axelarjs-sdk";
import memoize from "proxy-memoize";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { ENVIRONMENT } from "../config/constants";
import { getWagmiChains } from "../config/web3";

import { SwapOrigin, SwapStatus } from "../utils/enums";

const getWagmiChainOverride = (wagmiNetwork: string) => {
  const map: Record<string, string> = {
    "ropsten": "ethereum",
  }
  return map[wagmiNetwork] || wagmiNetwork;
}

/**
 * COMPUTED VALUES
 */
export const getSrcChainId = memoize((state: { srcChain: ChainInfo }) => {
  if (!state.srcChain) return undefined;
  const chains = getWagmiChains();
  console.log("chains",chains);
  const chain = chains.find(
    (_chain) => getWagmiChainOverride(_chain.network) === state.srcChain.chainIdentifier[ENVIRONMENT]
  );
  return chain?.id;
});

export const getDestChainId = memoize((state: { destChain: ChainInfo }) => {
  if (!state.destChain) return null;
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) => getWagmiChainOverride(_chain.network) === state.destChain.chainIdentifier[ENVIRONMENT]
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

interface TxInfo {
  sourceTxHash?: string;
  destTxHash?: string;
  destStartBlockNumber?: number;
}

interface SwapState {
  allAssets: AssetConfig[];
  allChains: ChainInfo[];
  srcChain: ChainInfo;
  destChain: ChainInfo;
  destAddress: string;
  selectableAssetList: AssetConfig[];
  asset: AssetConfig | null;
  swapStatus: SwapStatus;
  depositAddress: string;
  swapOrigin: SwapOrigin;
  tokensToTransfer: string;
  txInfo: TxInfo;
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
  setSwapOrigin: (origin: SwapOrigin) => void;
  setTokensToTransfer: (tokens: string) => void;
  setTxInfo: (_txInfo: TxInfo) => void;
  resetState: () => void;
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
  swapStatus: SwapStatus.IDLE,
  swapOrigin: SwapOrigin.APP,
  txInfo: {
    sourceTxHash: "",
    destTxHash: "",
    destStartBlockNumber: 1,
  },
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
      set(
        {
          srcChain: chain,
        },
        false,
        "setSrcChain"
      );
    },
    setDestChain: (chain) =>
      set(
        {
          destChain: chain,
        },
        false,
        "setDestChain"
      ),
    setDestAddress: (address) =>
      set(
        {
          destAddress: address,
        },
        false,
        "setDestAddress"
      ),
    setAsset: (asset) =>
      set(
        {
          asset,
        },
        false,
        "setAsset"
      ),
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
          srcChain: get().allChains.find(
            (chain) => chain.chainName.toLowerCase() === "avalanche"
          ),
          destChain: get().allChains.find(
            (chain) => chain.chainName.toLowerCase() === "moonbeam"
          ),
          asset: get().allAssets.find((asset) =>
            asset?.common_key[ENVIRONMENT].includes("usdc")
          ),
        },
        false,
        "resetState"
      ),
  }))
);

/**
 * Store created to avoid hydration issues with wagmi
 * TODO: move to another file
 */
interface WalletState {
  walletConnected: boolean;
}

interface WalletStore extends WalletState {
  setWalletConnected: (state: boolean) => void;
}

export const useWalletStore = create<WalletStore>()(
  devtools((set, get) => ({
    walletConnected: false,
    setWalletConnected: (state) =>
      set(
        {
          walletConnected: state,
        },
        false,
        "setWalletConnected"
      ),
  }))
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
