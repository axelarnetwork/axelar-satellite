import React from "react";
import Image from "next/image";

import { allChains } from "../../../config/chains";

export const SourceChainSelector = () => {
  return (
    <div>
      <label className="text-xs block">From</label>
      <div className="static dropdown">
        <div tabIndex={0}>
          <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
            <Image
              src="/assets/chains/ethereum.logo.svg"
              layout="intrinsic"
              width={40}
              height={40}
            />
            <span>Ethereum</span>
            <div className="flex items-center">
              <Image
                src="/assets/ui/arrow-down.svg"
                layout="intrinsic"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="p-2 rounded-lg shadow dropdown-content menu bg-[#02141b] left-0 w-full h-64 overflow-auto"
        >
          {allChains.map((chain) => {
            return (
              <li key={chain.chainInfo.chainName}>
                <a>{chain.chainInfo.chainName}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
