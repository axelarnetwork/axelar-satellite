import { Chain, AssetConfig } from "@axelar-network/axelarjs-sdk";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { allChains } from "../config/chains";
import { SwapStatus } from "../utils/enums";

interface SwapState {
  srcChain: Chain;
  destChain: Chain;
  destAddress: string;
  selectableAssetList: AssetConfig[];
  asset: AssetConfig | null;
  swapStatus: SwapStatus;
  despositAddress: string;
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
};

export const useSwapStore = create<SwapStore>()(
  devtools((set) => ({
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
        (state) => ({
          despositAddress: address,
        }),
        false,
        "setDepositAddress"
      ),
    setSwapStatus: (newStatus) =>
      set(
        (state) => ({
          swapStatus: newStatus,
        }),
        false,
        "setSwapStatus"
      ),
  }))
);
