import { ChainInfo, Chain } from "@axelar-network/axelarjs-sdk";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { allChains } from "../config/chains";

interface SwapSwate {
  srcChain: Chain;
  destChain: Chain;
  setSrcChain: (chain: any) => void;
  setDestChain: (chain: any) => void;
  switchChains: () => void;
}

export const useSwapStore = create<SwapSwate>()(
  devtools((set) => ({
    srcChain: allChains[0],
    destChain: allChains[1],
    setSrcChain: (chain: Chain) =>
      set({
        srcChain: chain,
      }),
    setDestChain: (chain: Chain) =>
      set({
        destChain: chain,
      }),
    switchChains: () =>
      set((state) => ({
        destChain: state.srcChain,
        srcChain: state.destChain,
      })),
  }))
);
