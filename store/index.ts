import { Chain, AssetConfig } from "@axelar-network/axelarjs-sdk";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { allChains } from "../config/web3";

import { SwapOrigin, SwapStatus } from "../utils/enums";

interface SwapState {
  srcChain: Chain;
  destChain: Chain;
  destAddress: string;
  selectableAssetList: AssetConfig[];
  asset: AssetConfig | null;
  swapStatus: SwapStatus;
  despositAddress: string;
  swapOrigin: SwapOrigin;
  tokensToTransfer: string;
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
  srcChain: avalancheChain,
  destChain: moonbeamChain,
  destAddress: "",
  selectableAssetList: [],
  asset: null,
  swapStatus: SwapStatus.IDLE,
  despositAddress: "",
  swapOrigin: SwapOrigin.APP,
  tokensToTransfer: "",
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
          despositAddress: address,
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
