import React from "react";

import { AssetSelector } from "features/asset-selector";
import { DestChainSelector } from "features/dest-chain-selector";
import { GetAddressBtn } from "features/gen-address-btn";
import { SquidSwapBtn } from "features/squid-swap-btn";
import { SrcChainSelector } from "features/src-chain-selector";

import {
  getSelectedAsssetIsWrapped,
  useSquidStateStore,
  useSwapStore,
} from "../../store";

import cn from "classnames";

import { ENVIRONMENT as env } from "../../config/constants";
import {
  useDetectDepositConfirmation,
  usePreventDuplicateChains,
  useRestrictAssets,
} from "../../hooks";
import { Blockable, InputWrapper } from "../common";
import { EvmAssetWarningModal, ModalWindow } from "../modal";
import { ChainSwapper, StopButton, SwapStates } from "./parts";
import { DestinationTokenSelector } from "./parts/DestinationTokenSelector";
import { TopFlows } from "./parts/TopFlows";

export const SwapBox = () => {
  usePreventDuplicateChains();
  useDetectDepositConfirmation();
  useRestrictAssets();

  const { destChain, asset } = useSwapStore((state) => state);
  const selectedAssetIsWrapped = useSwapStore(getSelectedAsssetIsWrapped);
  const squidChains = useSquidStateStore((state) => state.squidChains);
  const isSquidAsset = useSquidStateStore((state) => state.isSquidTrade);
  const squidAssets = destChain.assets
    .filter(
      //@ts-ignore
      (t) => t.isSquidAsset
    )
    .filter(
      (t) =>
        t.tokenAddress?.toLowerCase() !==
        asset?.chain_aliases[
          destChain.chainName.toLowerCase()
        ].tokenAddress.toLowerCase()
    );

  return (
    <div className="bg-base-100 rounded-xl w-full max-w-[550px] min-h-[500px] h-auto z-10">
      <ModalWindow />
      <EvmAssetWarningModal />
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <div
          className={cn("relative flex mb-0 space-x-8", {
            "justify-end": env === "mainnet",
            "justify-between": env === "testnet",
          })}
        >
          {env !== "mainnet" && (
            <div
              className={`font-bold text-white bg-red-500 border-0 badge badge-primary`}
            >
              {env.toUpperCase()}
            </div>
          )}
          <div className="flex">
            <StopButton />
            <Blockable>
              <TopFlows />
            </Blockable>
          </div>
        </div>

        <Blockable>
          <div className="flex justify-between">
            <InputWrapper>
              <SrcChainSelector />
            </InputWrapper>
            <div className="relative z-40 flex items-center -mx-2">
              <ChainSwapper />
            </div>
            <InputWrapper>
              <DestChainSelector />
            </InputWrapper>
          </div>
        </Blockable>

        <InputWrapper>
          <AssetSelector />
        </InputWrapper>
        {((destChain?.module === "evm" && selectedAssetIsWrapped) ||
          squidAssets?.length > 0) && (
          <InputWrapper>
            <DestinationTokenSelector squidAssets={squidAssets} />
          </InputWrapper>
        )}

        <SwapStates />

        {isSquidAsset ? <SquidSwapBtn /> : <GetAddressBtn />}
      </div>
    </div>
  );
};
