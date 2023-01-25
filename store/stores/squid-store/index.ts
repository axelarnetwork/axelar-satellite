import { ChainData, ChainName, TokenData } from "@0xsquid/sdk";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";

import create from "zustand";
import { devtools } from "zustand/middleware";

export interface TokensWithExtendedChainData extends TokenData {
  chainName: ChainName;
}

interface SquidState {
  squidTokens: TokensWithExtendedChainData[];
  squidChains: ChainData[];
  squidLoaded: boolean;
  isSquidTrade: boolean;
  selectedSquidAsset: AssetInfo | null;
}

interface SquidStateStore extends SquidState {
  setSquidTokens: (state: TokensWithExtendedChainData[]) => void;
  setSquidChains: (state: ChainData[]) => void;
  setSquidLoaded: (state: boolean) => void;
  setIsSquidTrade: (state: boolean) => void;
  setSelectedSquidAsset: (state: AssetInfo) => void;
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
    squidLoaded: false,
    setSquidLoaded: (state) =>
      set(
        {
          squidLoaded: state,
        },
        false,
        "setSquidLoaded"
      ),
    isSquidTrade: false,
    setIsSquidTrade: (state) =>
      set(
        {
          isSquidTrade: state,
        },
        false,
        "setIsSquidTrade"
      ),
    selectedSquidAsset: null,
    setSelectedSquidAsset: (state) =>
      set(
        {
          selectedSquidAsset: state,
        },
        false,
        "setSelectedSquidAsset"
      ),
  }))
);
