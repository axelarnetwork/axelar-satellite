import React from "react";
import cn from "classnames";
import { useConnect } from "wagmi";
import Image from "next/image";

import { SpinnerCircular } from "spinners-react";
import { useSwapStore } from "../../store";
import { ConnectIndicator, InputWrapper, StatsWrapper } from "../common";
import {
  AddressFiller,
  ChainSwapper,
  ConnectButton,
  DestChainSelector,
  GenerateDepositAddressButton,
  InitialStats,
  OriginSwapper,
  SourceChainSelector,
  TokenSelector,
} from "./parts";

import { SwapStatus } from "../../utils/enums";

export const SwapBox = () => {
  const { isConnected } = useConnect();
  const { destAddress, setDestAddress, swapStatus, despositAddress } =
    useSwapStore((state) => state);

  function renderIdleState() {
    return (
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
    );
  }

  function renderBusyState() {
    return (
      <InputWrapper className="h-40">
        <div className="flex items-center justify-center h-full space-x-2">
          <SpinnerCircular
            size={20}
            thickness={147}
            color={"#00a5ff"}
            secondaryColor={"#375f73"}
          />
          <span className="text-sm font-bold">
            Generating deposit address...
          </span>
        </div>
      </InputWrapper>
    );
  }

  function renderWaitState() {
    return (
      <div>
        <InputWrapper className="h-auto" style={{ minHeight: "10rem" }}>
          <div className="flex flex-col items-center mt-4 text-xs">
            <div>
              <label>Deposit Address</label>
              <div className="flex gap-x-2">
                <div className="font-medium text-blue-400 cursor-pointer">
                  {despositAddress}
                </div>

                <label className="swap swap-rotate">
                  <input type="checkbox" />

                  <div className="swap-on">
                    <Image
                      layout="intrinsic"
                      height={15}
                      width={15}
                      src="/assets/ui/copy-check.svg"
                    />
                  </div>

                  <div className="swap-off">
                    <Image height={15} width={15} src="/assets/ui/copy.svg" />
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label>Transaction Hash</label>
              <div className="flex gap-x-2">
                <div className="font-medium text-blue-400 cursor-pointer">
                  {despositAddress}
                </div>

                <label className="swap swap-rotate">
                  <input type="checkbox" />

                  <div className="swap-on">
                    <Image
                      layout="intrinsic"
                      height={15}
                      width={15}
                      src="/assets/ui/copy-check.svg"
                    />
                  </div>

                  <div className="swap-off">
                    <Image height={15} width={15} src="/assets/ui/copy.svg" />
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <h4>Send deposit via</h4>

              <div className="bg-gradient-to-b from-[#E8821E] to-[#F89C35] w-28 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse">
                <div className="flex justify-between items-center h-full w-full bg-[#291e14] rounded-lg p-2">
                  <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#E8821E] to-[#F89C35]">
                    Metamask
                  </div>

                  <div className="relative flex items-center h-full">
                    <Image
                      layout="intrinsic"
                      height={25}
                      width={25}
                      src="/assets/wallets/metamask.logo.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InputWrapper>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-[#385073]/10 rounded-xl w-[500px] min-h-[500px] h-auto">
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <OriginSwapper />
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

        {swapStatus === SwapStatus.IDLE && renderIdleState()}
        {swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS && renderBusyState()}
        {swapStatus === SwapStatus.WAIT_FOR_DEPOSIT && renderWaitState()}

        <div className="flex flex-col justify-end h-full">
          {!isConnected && <ConnectButton />}
          {isConnected && <GenerateDepositAddressButton />}
        </div>
      </div>
    </div>
  );
};
