import {
  ChainData,
  ChainName,
  GetRoute,
  RouteData,
  TokenData,
} from "@0xsquid/sdk";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";

import { squid } from "squid.config";
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
  slippage: number;
  routeData: RouteData | null;
}

interface SquidStateStore extends SquidState {
  setSquidTokens: (state: TokensWithExtendedChainData[]) => void;
  setSquidChains: (state: ChainData[]) => void;
  setSquidLoaded: (state: boolean) => void;
  setIsSquidTrade: (state: boolean) => void;
  setSelectedSquidAsset: (state: AssetInfo | null) => void;
  setSlippage: (state: number) => void;
  setRouteData: (state: RouteData | null) => void;
  setRouteDataAsync: (params: GetRoute) => void;
}

export const useSquidStateStore = create<SquidStateStore>()(
  devtools((set, get) => ({
    squidTokens: [],
    setSquidTokens: (state: TokensWithExtendedChainData[]) =>
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
    setSelectedSquidAsset: (state: AssetInfo | null) =>
      set(
        {
          selectedSquidAsset: state,
        },
        false,
        "setSelectedSquidAsset"
      ),
    slippage: 1,
    setSlippage: (state) =>
      set(
        {
          slippage: state,
        },
        false,
        "setSlippage"
      ),
    routeData: null,
    setRouteData: (state: RouteData | null) =>
      set(
        {
          routeData: state,
        },
        false,
        "setRouteData"
      ),
    setRouteDataAsync: async (params: GetRoute) => {
      try {
        const { route: routeData } = await squid.getRoute(params);
        console.log("setting route async", routeData);
        set({ routeData }, false, "setRouteDataAsync");
      } catch (e) {
        set({ routeData: null }, false, "setRouteDataAsync");
      }
    },
  }))
);
