import React from "react";
import cn from "classnames";
import { useConnect } from "wagmi";
import { useSwapStore } from "../../store";
import { ConnectIndicator, InputWrapper, StatsWrapper } from "../common";
import {
  AddressFiller,
  ChainSwapper,
  ConnectButton,
  DestChainSelector,
  GenerateDepositAddressButton,
  InitialStats,
  SourceChainSelector,
  TokenSelector,
} from "./parts";
import { useGenerateDepositAddress } from "../../hooks/api";

export const SwapBox = () => {
  const { isConnected } = useConnect();
  const { destAddress, setDestAddress, isBusy } = useSwapStore(
    (state) => state
  );

  return (
    <div className="backdrop-blur-lg bg-[#385073]/10 rounded-xl w-[500px] min-h-[500px] h-auto">
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <ConnectIndicator />
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

        {!isBusy && (
          <>
            <div>
              <InitialStats />
            </div>

            <div
              className={cn({
                "opacity-0": !isConnected,
              })}
            >
              <div className="flex h-10 gap-2 ">
                <InputWrapper className="h-full">
                  <div className="h-full">
                    <input
                      className="w-full h-full text-xs bg-transparent outline-none"
                      placeholder="Destination address"
                      value={destAddress}
                      onChange={(e) => setDestAddress(e.target.value)}
                    />
                  </div>
                </InputWrapper>
                <div className="h-full">
                  <AddressFiller />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col justify-end h-full">
          {!isConnected && <ConnectButton />}
          {isConnected && <GenerateDepositAddressButton />}
        </div>
      </div>
    </div>
  );
};
