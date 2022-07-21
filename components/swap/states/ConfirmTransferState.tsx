import React, { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import Image from "next/image";
import { erc20ABI, useContractEvent, useWaitForTransaction } from "wagmi";
import { ENVIRONMENT } from "../../../config/constants";
import { getWagmiChains } from "../../../config/web3";
import { useSwapStore } from "../../../store";
import { SwapOrigin, SwapStatus } from "../../../utils/enums";
import { AddressShortener, InputWrapper } from "../../common";
import { EvmWalletTransfer } from "./parts";
import toast from "react-hot-toast";

export const ConfirmTransferState = () => {
  return (
    <InputWrapper className="h-40">
      <div className="h-full space-x-2">
        <div className="flex flex-col w-full h-full">
          <div className="h-full">
            <div className="grid items-center grid-cols-5 mt-2 text-xs font-medium justify-items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                1
              </div>
              <progress
                className="h-1 progress progress-primary"
                value={1}
              ></progress>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                2
              </div>
              <progress
                className="h-1 progress progress-primary"
                value={1}
              ></progress>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                3
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 text-xs gap-x-2"></div>
          </div>
          <div className="w-full mt-auto">
            <div className="my-0 divider" />
            <div className="w-full text-xs font-medium text-center text-gray-500">
              Waiting for confirmations
            </div>
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};
