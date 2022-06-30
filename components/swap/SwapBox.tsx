import React from "react";
import { useSwapStore, useWalletStore } from "../../store";
import { ConnectIndicator, InputWrapper } from "../common";
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
import { GenDepositAddressState, IdleState, WaitDepositState } from "./states";

export const SwapBox = () => {
  const { swapStatus } = useSwapStore((state) => state);
  const walletConnected = useWalletStore((state) => state.walletConnected);

  return (
    <div className="backdrop-blur-lg bg-[#385073]/10 rounded-xl w-[500px] min-h-[500px] h-auto">
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <div className="relative flex justify-between space-x-8">
          <ConnectIndicator />

          <button className="btn btn-xs btn-neutral">Top Flows</button>
        </div>
        <div>
          <OriginSwapper />
        </div>
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

        <div>
          <InputWrapper>
            <TokenSelector />
          </InputWrapper>
        </div>

        {swapStatus === SwapStatus.IDLE && <IdleState />}
        {swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS && (
          <GenDepositAddressState />
        )}
        {swapStatus === SwapStatus.WAIT_FOR_DEPOSIT && <WaitDepositState />}

        <div className="flex flex-col justify-end h-full pt-2">
          {!walletConnected && <ConnectButton />}
          {walletConnected && swapStatus === SwapStatus.IDLE && (
            <GenerateDepositAddressButton />
          )}
          {walletConnected && swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS && (
            <button className="w-full btn btn-disabled" disabled>
              <div className="flex items-center gap-3">
                <span>Processing...</span>
              </div>
            </button>
          )}

          {walletConnected && swapStatus === SwapStatus.WAIT_FOR_DEPOSIT && (
            <button className="w-full btn btn-disabled" disabled>
              <div className="flex items-center gap-3">
                <span>Waiting for deposit...</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
