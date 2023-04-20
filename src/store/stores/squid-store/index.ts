import {
  ChainData,
  ChainName,
  GetRoute,
  RouteData,
  StatusResponse,
  TokenData,
} from "@0xsquid/sdk";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { squid } from "~/squid.config";
import { AssetAlias } from "~/types";

export interface TokensWithExtendedChainData extends TokenData {
  chainName: ChainName;
}

interface SquidState {
  squidTokens: TokensWithExtendedChainData[];
  squidChains: ChainData[];
  squidLoaded: boolean;
  isSquidTrade: boolean;
  selectedSquidAsset: AssetAlias | null;
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
  setSelectedSquidAsset: (state: AssetAlias | null) => void;
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
  enableGMPExpress: true,
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
    setSelectedSquidAsset: (state: AssetAlias | null) =>
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
        const { route } = await squid.getRoute(params);
        const gmpeEnabled = get().enableGMPExpress;

        const routeData = {
          ...route,
          params: { ...route.params, enableForecall: gmpeEnabled },
        };
        set({ routeData, routeDataLoading: false }, false, "setRouteDataAsync");
      } catch (e: any) {
        set(
          { routeData: null, routeDataLoading: false },
          false,
          "setRouteDataAsync"
        );
        throw JSON.stringify(e.errors);
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
    setEnableGMPExpress: (state) => {
      const routeData = get().routeData;
      if (routeData && routeData?.params?.enableExpress !== state) {
        const newRouteData = {
          ...routeData,
          params: { ...routeData?.params, enableExpress: state },
        };
        set(
          {
            enableGMPExpress: state,
            // @ts-ignore
            routeData: newRouteData,
          },
          false,
          "setEnableGMPExpress"
        );
      } else {
        set(
          {
            enableGMPExpress: state,
          },
          false,
          "setEnableGMPExpress"
        );
      }
    },
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
