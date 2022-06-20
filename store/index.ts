import { Chain, AssetConfig } from "@axelar-network/axelarjs-sdk";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { allChains } from "../config/chains";
import { allAssets } from "../config/assets";

interface SwapState {
  srcChain: Chain;
  destChain: Chain;
  selectableAssetList: AssetConfig[];
  asset: AssetConfig | null;
}

interface SwapStore extends SwapState {
  setSrcChain: (chain: Chain) => void;
  setDestChain: (chain: Chain) => void;
  setAsset: (asset: AssetConfig | null) => void;
  setAssetList: (assets: AssetConfig[]) => void;
  switchChains: () => void;
}

/**
 * We define an initial state for easy state reset if needed
 */
const initialState: SwapState = {
  srcChain: allChains.find(
    (chain) => chain.chainInfo.chainSymbol === "AVAX"
  ) as Chain,
  destChain: allChains.find(
    (chain) => chain.chainInfo.chainSymbol === "MOONBEAM"
  ) as Chain,
  selectableAssetList: [],
  asset: null,
};

export const useSwapStore = create<SwapStore>()(
  devtools((set) => ({
    ...initialState,
    setSrcChain: (chain) =>
      set(
        {
          srcChain: chain,
        },
        undefined,
        "setSrcChain"
      ),
    setDestChain: (chain) =>
      set(
        {
          destChain: chain,
        },
        undefined,
        "setDestChain"
      ),
    setAsset: (asset) =>
      set(
        {
          asset,
        },
        undefined,
        "setAsset"
      ),
    setAssetList: (assets) =>
      set(
        {
          selectableAssetList: assets,
        },
        undefined,
        "setAssetList"
      ),
    switchChains: () =>
      set(
        (state) => ({
          destChain: state.srcChain,
          srcChain: state.destChain,
        }),
        undefined,
        "switchChains"
      ),
  }))
);
