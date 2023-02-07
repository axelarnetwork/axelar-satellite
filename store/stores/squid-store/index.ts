import {
  ChainData,
  ChainName,
  GetRoute,
  RouteData,
  StatusResponse,
  TokenData,
} from "@0xsquid/sdk";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { TransactionReceipt } from "@ethersproject/abstract-provider";

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
  enableGMPExpress: boolean;
  routeData: RouteData | null;
  routeDataLoading: boolean;
  txReceipt: TransactionReceipt | null;
  statusResponse: StatusResponse | null;
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
  setRouteDataLoading: (state: boolean) => void;
  setTxReceipt: (state: TransactionReceipt) => void;
  setStatusResponse: (state: StatusResponse) => void;
  setEnableGMPExpress: (state: boolean) => void;
  resetSquidState: () => void;
}

const initialState: SquidState = {
  squidTokens: [],
  squidChains: [],
  squidLoaded: false,
  isSquidTrade: false,
  selectedSquidAsset: null,
  slippage: 1,
  routeData: null,
  routeDataLoading: false,
  txReceipt: null,
  statusResponse: null,
  enableGMPExpress: false,
};

export const useSquidStateStore = create<SquidStateStore>()(
  devtools((set, get) => ({
    ...initialState,
    setSquidTokens: (state: TokensWithExtendedChainData[]) =>
      set(
        {
          squidTokens: state,
        },
        false,
        "setSquidTokens"
      ),
    setSquidChains: (state) =>
      set(
        {
          squidChains: state,
        },
        false,
        "setSquidChains"
      ),
    setSquidLoaded: (state) =>
      set(
        {
          squidLoaded: state,
        },
        false,
        "setSquidLoaded"
      ),
    setIsSquidTrade: (state) =>
      set(
        {
          isSquidTrade: state,
        },
        false,
        "setIsSquidTrade"
      ),
    setSelectedSquidAsset: (state: AssetInfo | null) =>
      set(
        {
          selectedSquidAsset: state,
        },
        false,
        "setSelectedSquidAsset"
      ),
    setSlippage: (state) =>
      set(
        {
          slippage: state,
        },
        false,
        "setSlippage"
      ),
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
        set({ routeData, routeDataLoading: false }, false, "setRouteDataAsync");
      } catch (e) {
        set(
          { routeData: null, routeDataLoading: false },
          false,
          "setRouteDataAsync"
        );
      }
    },
    setRouteDataLoading: (state) =>
      set(
        {
          routeDataLoading: state,
        },
        false,
        "setRouteDataLoading"
      ),
    setTxReceipt: (state) =>
      set(
        {
          txReceipt: state,
        },
        false,
        "setTxReceipt"
      ),
    setStatusResponse: (state) =>
      set(
        {
          statusResponse: state,
        },
        false,
        "setStatusResponse"
      ),
    setEnableGMPExpress: (state) =>
      set(
        {
          enableGMPExpress: state,
        },
        false,
        "setEnableGMPExpress"
      ),
    resetSquidState: () =>
      set(
        {
          ...initialState,
          squidChains: get().squidChains,
          squidTokens: get().squidTokens,
          squidLoaded: get().squidLoaded,
        },
        false,
        "resetSquidState"
      ),
  }))
);
