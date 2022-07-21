import React from "react";
import { useSwapStore, useWalletStore } from "../../store";
import { Blockable, ConnectIndicator, InputWrapper } from "../common";
import {
  ChainSwapper,
  ConnectButton,
  DestChainSelector,
  GenerateDepositAddressButton,
  OriginSwapper,
  SourceChainSelector,
  TokenSelector,
} from "./parts";

import { SwapStatus } from "../../utils/enums";
import {
  GenDepositAddressState,
  IdleState,
  WaitDepositState,
  WaitEvmConfirmationState,
  ConfirmTransferState,
  WaitCosmosConfirmationState,
} from "./states";
import {
  useDetectDepositConfirmation,
  useDetectDestTransferConfirmation,
  usePreventDuplicateChains,
} from "../../hooks";

export const SwapBox = () => {
  const { swapStatus, destChain } = useSwapStore((state) => state);
  const walletConnected = useWalletStore((state) => state.walletConnected);

  // useDetectDepositConfirmation();
  useDetectDestTransferConfirmation();
  usePreventDuplicateChains();

  function renderStates() {
    if (swapStatus === SwapStatus.IDLE) return <IdleState />;
    if (swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS)
      return <GenDepositAddressState />;
    if (swapStatus === SwapStatus.WAIT_FOR_DEPOSIT) return <WaitDepositState />;
    if (
      swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION &&
      destChain.chainInfo.module === "evm"
    )
      return <WaitEvmConfirmationState />;
    if (
      swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION &&
      destChain.chainInfo.module === "axelarnet"
    )
      return <WaitCosmosConfirmationState />;
    if (swapStatus === SwapStatus.FINISHED) return <ConfirmTransferState />;
  }

  function renderActionButton() {
    if (!walletConnected) return <ConnectButton />;
    if (swapStatus === SwapStatus.IDLE) return <GenerateDepositAddressButton />;
    if (swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS)
      return (
        <button className="w-full btn btn-disabled" disabled>
          <div className="flex items-center gap-3">
            <span>Processing...</span>
          </div>
        </button>
      );
    if (swapStatus === SwapStatus.WAIT_FOR_DEPOSIT)
      return (
        <button className="w-full btn btn-disabled" disabled>
          <div className="flex items-center gap-3">
            <span>Waiting for deposit...</span>
          </div>
        </button>
      );
    if (swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION)
      return (
        <button className="w-full btn btn-disabled" disabled>
          <div className="flex items-center gap-3">
            <span>Waiting for confirmation...</span>
          </div>
        </button>
      );
  }

  return (
    <div className="backdrop-blur-lg bg-[#385073]/10 rounded-xl w-[500px] min-h-[500px] h-auto">
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <div className="relative flex justify-between space-x-8">
          <ConnectIndicator />
          <button className="btn btn-xs btn-neutral">Top Flows</button>
        </div>

        <OriginSwapper />

        <Blockable>
          <div className="flex justify-between">
            <InputWrapper>
              <SourceChainSelector />
            </InputWrapper>
            <div className="relative z-50 flex items-center -mx-2">
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

        {renderStates()}

        <div className="flex flex-col justify-end h-full pt-2">
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
};
