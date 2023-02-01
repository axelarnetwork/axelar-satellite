import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AssetConfigExtended } from "~/types";

import { ENVIRONMENT } from "../../../config/constants";
import { SwapOrigin, SwapStatus } from "../../../utils/enums";

export * from "./computed";

interface TxInfo {
  sourceTxHash?: string;
  destTxHash?: string;
  destStartBlockNumber?: number;
}

interface SwapState {
  allAssets: AssetConfigExtended[];
  allChains: ChainInfo[];
  srcChain: ChainInfo;
  destChain: ChainInfo;
  destAddress: string;
  selectableAssetList: AssetConfigExtended[];
  initialAsset: AssetConfigExtended | null;
  asset: AssetConfigExtended | null;
  swapStatus: SwapStatus;
  depositAddress: string;
  intermediaryDepositAddress: string;
  swapOrigin: SwapOrigin;
  tokensToTransfer: string;
  txInfo: TxInfo;
  rehydrateAssets: boolean;
  shouldUnwrapAsset: boolean;
}

interface SwapStore extends SwapState {
  setAllAssets: (assets: AssetConfigExtended[]) => void;
  setAllChains: (chains: ChainInfo[]) => ChainInfo[];
  setSrcChain: (chain: ChainInfo) => void;
  setDestChain: (chain: ChainInfo) => void;
  setDestAddress: (address: string) => void;
  setAsset: (asset: AssetConfigExtended | null) => void;
  setInitialAsset: (asset: AssetConfigExtended | null) => void;
  setAssetList: (assets: AssetConfigExtended[]) => void;
  switchChains: () => void;
  setSwapStatus: (newStatus: SwapStatus) => void;
  setDepositAddress: (address: string) => void;
  setIntermediaryDepositAddress: (address: string) => void;
  setSwapOrigin: (origin: SwapOrigin) => void;
  setTokensToTransfer: (tokens: string) => void;
  setTxInfo: (_txInfo: TxInfo) => void;
  resetState: () => void;
  setRehydrateAssets: (value: boolean) => void;
  setShouldUnwrapAsset: (value: boolean) => void;
}

/**
 * We define an initial state for easy state reset if needed
 */
const initialState: SwapState = {
  allAssets: [],
  allChains: [],
  selectableAssetList: [], // list of assets to select from
  srcChain: {} as ChainInfo,
  destChain: {} as ChainInfo,
  initialAsset: null, // helper for switching between native/wrapped assets
  asset: null, // asset to transfer
  tokensToTransfer: "", // asset amount to transfer
  destAddress: "", // user owned account to transfer assets to
  depositAddress: "", // axelar generated account where user should deposit his assets
  intermediaryDepositAddress: "",
  swapStatus: SwapStatus.IDLE,
  swapOrigin: SwapOrigin.APP,
  txInfo: {
    sourceTxHash: "",
    destTxHash: "",
    destStartBlockNumber: 1,
  },
  rehydrateAssets: true,
  shouldUnwrapAsset: false,
};

export const useSwapStore = create<SwapStore>()(
  devtools((set, get) => ({
    ...initialState,
    setAllAssets: (assets) => {
      set(
        {
          allAssets: assets,
        },
        false,
        "setAllAssets"
      );
    },
    setAllChains: (chains) => {
      set(
        {
          allChains: chains,
        },
        false,
        "setAllChains"
      );
      return chains;
    },
    setSrcChain: (chain) => {
      set(
        {
          srcChain: chain,
        },
        false,
        "setSrcChain"
      );
    },
    setDestChain: (chain) => {
      set(
        {
          destChain: chain,
        },
        false,
        "setDestChain"
      );
    },
    setDestAddress: (address) =>
      set(
        {
          destAddress: address,
        },
        false,
        "setDestAddress"
      ),
    setAsset: (asset) => {
      set(
        {
          asset,
        },
        false,
        "setAsset"
      );
    },
    setInitialAsset: (asset) =>
      set(
        {
          initialAsset: asset,
        },
        false,
        "setInitialAsset"
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
          depositAddress: address,
        }),
        false,
        "setDepositAddress"
      ),
    setIntermediaryDepositAddress: (address) =>
      set(
        () => ({
          intermediaryDepositAddress: address,
        }),
        false,
        "setIntermediaryDepositAddress"
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
    setTxInfo: (_txInfo) =>
      set(
        {
          txInfo: {
            ...get().txInfo,
            ..._txInfo,
          },
        },
        false,
        "setTxInfo"
      ),
    resetState: () =>
      set(
        {
          ...initialState,
          allChains: get().allChains,
          allAssets: get().allAssets,
          selectableAssetList: get().selectableAssetList,
          srcChain: get().srcChain,
          destChain: get().destChain,
          asset: get().allAssets.find((asset) =>
            asset?.common_key[ENVIRONMENT].includes("usdc")
          ),
          rehydrateAssets: true,
        },
        false,
        "resetState"
      ),
    setRehydrateAssets: (value: boolean) =>
      set(
        {
          rehydrateAssets: value,
        },
        false,
        "setRehydrateAssets"
      ),

    setShouldUnwrapAsset: (value: boolean) =>
      set(
        {
          shouldUnwrapAsset: value,
        },
        false,
        "setShouldUnwrapAsset"
      ),
  }))
);
