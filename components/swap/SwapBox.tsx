import Image from "next/image";
import React from "react";
import { InputWrapper, StatsWrapper } from "../common";
import {
  AddressFiller,
  ChainSwitcher,
  DestChainSelector,
  SourceChainSelector,
  TokenSelector,
} from "./parts";

export const SwapBox = () => {
  return (
    <div className="backdrop-blur-lg bg-[#385073]/10 rounded-xl w-[500px] h-[500px]">
      <div className="p-8">
        <div className="flex justify-between">
          <InputWrapper>
            <SourceChainSelector />
          </InputWrapper>
          <div className="relative z-50 flex items-center -mx-2">
            <ChainSwitcher />
          </div>
          <InputWrapper>
            <DestChainSelector />
          </InputWrapper>
        </div>

        <div className="mt-4">
          <InputWrapper>
            <TokenSelector />
          </InputWrapper>
        </div>

        <div className="mt-4">
          <StatsWrapper>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Current asset balance:</span>
                <span>00.00</span>
              </li>
              <li className="flex justify-between">
                <span>Minimum deposit amount:</span>
                <span>00.00</span>
              </li>
              <li className="flex justify-between">
                <span>Relayer Gas Fees:</span>
                <span>00.00</span>
              </li>
              <li className="flex justify-between">
                <span>Estimated wait time:</span>
                <span>~ 00-00 min</span>
              </li>
            </ul>
          </StatsWrapper>
        </div>

        <div className="mt-4">
          <div className="flex gap-5">
            <InputWrapper>
              <div className="h-full">
                <input
                  className="h-full bg-transparent outline-none"
                  placeholder="0x....."
                />
              </div>
            </InputWrapper>
            <div>
              <AddressFiller />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
