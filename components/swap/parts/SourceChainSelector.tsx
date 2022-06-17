import React, { useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";

import { allChains } from "../../../config/chains";
import { useSwapStore } from "../../../store";

export const SourceChainSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { srcChain, setSrcChain } = useSwapStore((state) => state);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnChainChange(chain: string) {
    setSrcChain(chain);
  }

  function handleOnDropdownToggle() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div ref={ref}>
      <label className="block text-xs">From</label>
      <div
        className="static dropdown dropdown-open"
        onClick={handleOnDropdownToggle}
      >
        <div tabIndex={0}>
          <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
            <Image
              src="/assets/chains/ethereum.logo.svg"
              layout="intrinsic"
              width={40}
              height={40}
            />
            <span>{srcChain}</span>
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
        {dropdownOpen && (
          <ul
            tabIndex={0}
            className="p-2 rounded-lg shadow dropdown-content  menu bg-[#02141b] left-0 w-full h-64 overflow-auto"
          >
            {allChains.map((chain) => {
              return (
                <li key={chain.chainInfo.chainName}>
                  <button
                    onClick={() =>
                      handleOnChainChange(chain.chainInfo.chainName)
                    }
                  >
                    {chain.chainInfo.chainName}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
