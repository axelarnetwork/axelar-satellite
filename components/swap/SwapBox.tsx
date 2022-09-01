import React from "react";
import { Blockable, InputWrapper } from "../common";
import {
  ActionButton,
  ChainSwapper,
  DestChainSelector,
  SourceChainSelector,
  StopButton,
  SwapStates,
  TokenSelector,
} from "./parts";

import {
  useDetectDepositConfirmation,
  usePreventDuplicateChains,
} from "../../hooks";
import { TopFlows } from "./parts/TopFlows";
import { EvmAssetWarningModal, ModalWindow } from "../modal";
import { ENVIRONMENT } from "../../config/constants";

export const SwapBox = () => {
  usePreventDuplicateChains();
  useDetectDepositConfirmation();

  return (
    <div className="bg-base-100 rounded-xl w-full max-w-[550px] min-h-[500px] h-auto z-10">
      <ModalWindow />
      <EvmAssetWarningModal />
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <div className="relative flex justify-between mb-0 space-x-8">
          <div
            className={`font-bold text-white ${
              ENVIRONMENT === "mainnet" ? "bg-green-900" : "bg-red-500"
            } border-0 badge badge-primary`}
          >
            {ENVIRONMENT.toUpperCase()}
          </div>
          <div className="flex">
            <StopButton />
            <Blockable>
              <TopFlows />
            </Blockable>
          </div>
        </div>

        {/* <OriginSwapper /> */}

        <Blockable>
          <div className="flex justify-between">
            <InputWrapper>
              <SourceChainSelector />
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

        <SwapStates />

        <div className="z-0 pt-2">
          <ActionButton />
        </div>
      </div>
    </div>
  );
};
