import React from "react";
import cn from "classnames";
import { useAccount, useConnect } from "wagmi";
import Image from "next/image";

import { SpinnerCircular } from "spinners-react";
import { useSwapStore } from "../../store";
import {
  AddressShortener,
  ConnectIndicator,
  InputWrapper,
  StatsWrapper,
} from "../common";
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

import { SwapOrigin, SwapStatus } from "../../utils/enums";
import { ENVIRONMENT } from "../../config/constants";
import toast from "react-hot-toast";
import { useListenForEvmTransfer } from "../../hooks";

export const SwapBox = () => {
  const { connector, isConnected } = useAccount();
  const {
    destAddress,
    setDestAddress,
    swapStatus,
    despositAddress,
    asset,
    swapOrigin,
  } = useSwapStore((state) => state);

  useListenForEvmTransfer();

  function handleOnCopyDestinationAddressToClipboard() {
    navigator.clipboard.writeText(despositAddress);
    toast.success("copied to clipboard!");
  }

  function renderIdleState() {
    return (
      <>
        <div>
          <InitialStats />
        </div>

        {connector && !isConnected && (
          <div className="h-10 my-4">
            <div className="text-sm rounded-lg bg-neutral alert">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0 w-6 h-6 stroke-info"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Please connect your wallet to use the app</span>
              </div>
            </div>
          </div>
        )}

        {connector && isConnected && (
          <div>
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
        )}
      </>
    );
  }

  function renderBusyState() {
    return (
      <InputWrapper className="h-40">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="h-full">
              <div className="grid items-center grid-cols-5 mt-2 text-xs font-medium justify-items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                  1
                </div>
                <progress className="h-1 progress progress-primary"></progress>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                  2
                </div>
                <progress className="h-1 progress" value={0}></progress>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                  3
                </div>
              </div>

              <div className="flex items-center justify-center mt-6 text-xs gap-x-2">
                <SpinnerCircular
                  size={20}
                  thickness={147}
                  color={"#00a5ff"}
                  secondaryColor={"#375f73"}
                />
                <span className="font-semibold">
                  Generating deposit address...
                </span>
              </div>
            </div>
            <div className="w-full mt-auto">
              <div className="my-0 divider" />
              <div className="w-full text-xs font-medium text-center text-gray-500">
                Generating deposit address
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    );
  }

  function renderWaitState() {
    return (
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="h-full">
              <div className="grid items-center grid-cols-5 mt-2 text-xs font-medium justify-items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                  1
                </div>
                <progress
                  className="h-1 progress progress-primary"
                  value={100}
                ></progress>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                  2
                </div>
                <progress className="h-1 progress"></progress>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                  3
                </div>
              </div>

              <div className="flex items-center justify-center mt-6 text-xs gap-x-2">
                <div>
                  <label className="block text-center">
                    Please transfer{" "}
                    <strong>{asset?.common_key[ENVIRONMENT]}</strong> to
                  </label>
                  <div className="flex font-bold text-info gap-x-2">
                    <AddressShortener value={despositAddress} />
                    <div
                      className="cursor-pointer"
                      onClick={handleOnCopyDestinationAddressToClipboard}
                    >
                      <Image
                        src={"/assets/ui/copy.svg"}
                        height={16}
                        width={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {swapOrigin === SwapOrigin.APP && (
                <div>
                  <div className="w-48 mx-auto my-1 text-xs divider">
                    OR USE
                  </div>
                  <div>
                    <div className="flex justify-center my-2 gap-x-5">
                      <button>
                        <Image
                          src="/assets/wallets/terra-station.logo.svg"
                          height={20}
                          width={20}
                        />
                      </button>
                      <button>
                        <Image
                          src="/assets/wallets/kepler.logo.svg"
                          height={20}
                          width={20}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full mt-auto">
              <div className="my-0 divider" />
              <div className="w-full text-xs font-medium text-center text-gray-500">
                Execution of asset transfer
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-[#385073]/10 rounded-xl w-[500px] min-h-[500px] h-auto">
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <div className="relative flex justify-between space-x-8">
          <ConnectIndicator />

          <button className="btn btn-xs btn-info">Top Flows</button>
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

        {swapStatus === SwapStatus.IDLE && renderIdleState()}
        {swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS && renderBusyState()}
        {swapStatus === SwapStatus.WAIT_FOR_DEPOSIT && renderWaitState()}

        <div className="flex flex-col justify-end h-full pt-2">
          {connector && !isConnected && <ConnectButton />}
          {connector && isConnected && swapStatus === SwapStatus.IDLE && (
            <GenerateDepositAddressButton />
          )}

          {connector &&
            isConnected &&
            swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS && (
              <button className="w-full btn btn-disabled" disabled>
                <div className="flex items-center gap-3">
                  <span>Processing...</span>
                </div>
              </button>
            )}

          {connector &&
            isConnected &&
            swapStatus === SwapStatus.WAIT_FOR_DEPOSIT && (
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
