import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SwapSwate {
  srcChain: any;
  destChain: any;
  setSrcChain: (chain: any) => void;
  setDestChain: (chain: any) => void;
}

export const useSwapStore = create<SwapSwate>()((set) => ({
  srcChain: "Ethereum",
  destChain: "Cosmos",
  setSrcChain: (chain: string) =>
    set({
      srcChain: chain,
    }),
  setDestChain: (chain: string) =>
    set({
      destChain: chain,
    }),
}));
