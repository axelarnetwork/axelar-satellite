import Image from "next/image";
import React from "react";
import { InputWrapper, StatsWrapper } from "../common";
import {
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
          <div className="-mx-2 flex items-center relative z-50">
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
            <ul className="text-sm space-y-2">
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
      </div>
    </div>
  );
};
