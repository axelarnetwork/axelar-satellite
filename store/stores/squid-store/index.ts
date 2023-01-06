import { ChainData, ChainName, TokenData } from "@0xsquid/sdk";

import create from "zustand";
import { devtools } from "zustand/middleware";

export interface TokensWithExtendedChainData extends TokenData {
  chainName: ChainName;
}

interface SquidState {
  squidTokens: TokensWithExtendedChainData[];
  squidChains: ChainData[];
}

interface SquidStateStore extends SquidState {
  setSquidTokens: (state: TokensWithExtendedChainData[]) => void;
  setSquidChains: (state: ChainData[]) => void;
}

export const useSquidStateStore = create<SquidStateStore>()(
  devtools((set, get) => ({
    squidTokens: [],
    setSquidTokens: (state) =>
      set(
        {
          squidTokens: state,
        },
        false,
        "setSquidTokens"
      ),
    squidChains: [],
    setSquidChains: (state) =>
      set(
        {
          squidChains: state,
        },
        false,
        "setSquidChains"
      ),
  }))
);
