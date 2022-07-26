import { Chain, AssetConfig } from "@axelar-network/axelarjs-sdk";
import memoize from "proxy-memoize";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { ENVIRONMENT } from "../config/constants";
import { allChains, getWagmiChains } from "../config/web3";

import { SwapOrigin, SwapStatus } from "../utils/enums";

/**
 * COMPUTED VALUES
 */
export const getSrcChainId = memoize((state: { srcChain: Chain }) => {
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      _chain.network === state.srcChain.chainInfo.chainIdentifier[ENVIRONMENT]
  );
  return chain?.id;
});

export const getDestChainId = memoize((state: { destChain: Chain }) => {
  const chains = getWagmiChains();
  const chain = chains.find(
    (_chain) =>
      _chain.network === state.destChain.chainInfo.chainIdentifier[ENVIRONMENT]
  );
  return chain?.id;
});

export const getSrcTokenAddress = memoize(
  (state: { srcChain: Chain; asset: AssetConfig | null }) => {
    if (!state.asset || !state.srcChain) return null;
    const srcChain = state.srcChain;
    const assetCommonKey = state.asset.common_key[ENVIRONMENT];

    const assetInfo = srcChain.chainInfo.assets?.find(
      (_asset) => _asset.common_key === assetCommonKey
    );
    return assetInfo?.tokenAddress || null;
  }
);

interface TxInfo {
  sourceTxHash?: string;
  destTxHash?: string;
  destStartBlockNumber?: number;
}

interface SwapState {
  srcChain: Chain;
  destChain: Chain;
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
  setSrcChain: (chain: Chain) => void;
  setDestChain: (chain: Chain) => void;
  setDestAddress: (address: string) => void;
  setAsset: (asset: AssetConfig | null) => void;
  setAssetList: (assets: AssetConfig[]) => void;
  switchChains: () => void;
  setSwapStatus: (newStatus: SwapStatus) => void;
  setDepositAddress: (address: string) => void;
  setSwapOrigin: (origin: SwapOrigin) => void;
  setTokensToTransfer: (tokens: string) => void;
  setTxInfo: (_txInfo: TxInfo) => void;
}

// initial chains
// TODO: probably need to add initial asset as well
const avalancheChain = allChains.find(
  (chain) => chain.chainInfo.chainSymbol === "AVAX"
) as Chain;
const moonbeamChain = allChains.find(
  (chain) => chain.chainInfo.chainSymbol === "MOONBEAM"
) as Chain;

/**
 * We define an initial state for easy state reset if needed
 */
const initialState: SwapState = {
  selectableAssetList: [], // list of assets to select from
  srcChain: avalancheChain,
  destChain: moonbeamChain,
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
    setSrcChain: (chain) =>
      set(
        {
          srcChain: chain,
        },
        false,
        "setSrcChain"
      ),
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
