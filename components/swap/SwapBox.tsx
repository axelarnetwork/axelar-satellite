import React from "react";
import cn from "classnames";
import { Blockable, InputWrapper } from "../common";
import {
  ActionButton,
  ChainSwapper,
  StopButton,
  SwapStates,
  TokenSelector,
} from "./parts";

import {
  useDetectDepositConfirmation,
  usePreventDuplicateChains,
  useRestrictAssets,
} from "../../hooks";
import { TopFlows } from "./parts/TopFlows";
import { EvmAssetWarningModal, ModalWindow } from "../modal";
import { ENVIRONMENT as env } from "../../config/constants";
import { DestinationTokenSelector } from "./parts/DestinationTokenSelector";
import { getSelectedAsssetIsWrapped, useSwapStore } from "../../store";
import { SrcChainSelector } from "features/src-chain-selector";
import { DestChainSelector } from "features/dest-chain-selector";

export const SwapBox = () => {
  usePreventDuplicateChains();
  useDetectDepositConfirmation();
  useRestrictAssets();

  const destChain = useSwapStore((state) => state.destChain);
  const selectedAssetIsWrapped = useSwapStore(getSelectedAsssetIsWrapped);

  useRestrictAssets();

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
          <TokenSelector />
        </InputWrapper>
        {destChain?.module === "evm" && selectedAssetIsWrapped && (
          <InputWrapper>
            <DestinationTokenSelector />
          </InputWrapper>
        )}

        <SwapStates />

        <div className="z-0 pt-2">
          <ActionButton />
        </div>
      </div>
    </div>
  );
};
