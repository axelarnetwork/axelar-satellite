import React, { useRef, useState } from "react";
import Image from "next/image";
import { allChains } from "../../../config/chains";
import { useSwapStore } from "../../../store";
import { useOnClickOutside } from "usehooks-ts";

export const DestChainSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { destChain, setDestChain } = useSwapStore((state) => state);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnChainChange(chain: string) {
    setDestChain(chain);
  }

  function handleOnDropdownToggle() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div>
      <label className="block text-xs">To</label>
      <div className="static dropdown">
        <div tabIndex={0}>
          <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
            <Image
              src="/assets/chains/cosmos.logo.svg"
              layout="intrinsic"
              width={40}
              height={40}
            />
            <span>{destChain}</span>
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
                <button
                  onClick={() => handleOnChainChange(chain.chainInfo.chainName)}
                >
                  {chain.chainInfo.chainName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
