import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSwapStore } from "../../../store";
import { useOnClickOutside } from "usehooks-ts";
import { convertChainName } from "../../../utils/transformers";
import { allChains } from "../../../config/web3";

const defaultChainImg = "/assets/chains/default.logo.svg";

export const DestChainSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { destChain, setDestChain } = useSwapStore((state) => state);
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    setDropdownOpen(!dropdownOpen);
  }

  function renderChainDropdown() {
    if (!dropdownOpen) return null;

    return (
      <ul
        tabIndex={0}
        className="p-2 rounded-lg shadow dropdown-content menu bg-[#02141b] left-0 w-full h-64 overflow-auto"
      >
        {allChains.map((chain) => {
          return (
            <li key={chain.chainInfo.chainSymbol}>
              <button onClick={() => setDestChain(chain)}>
                <Image
                  src={`/assets/chains/${chain.chainInfo.chainSymbol.toLowerCase()}.logo.svg`}
                  layout="intrinsic"
                  width={40}
                  height={40}
                  onError={(e) => {
                    e.currentTarget.src = defaultChainImg;
                    e.currentTarget.srcset = defaultChainImg;
                  }}
                />
                <span>{chain.chainInfo.chainName}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div ref={ref}>
      <label className="block text-xs">To</label>
      <div
        className="static mt-1 dropdown dropdown-open"
        onClick={handleOnDropdownToggle}
      >
        <div tabIndex={0}>
          <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
            <Image
              src={`/assets/chains/${destChain.chainInfo.chainSymbol.toLowerCase()}.logo.svg`}
              layout="intrinsic"
              width={40}
              height={40}
              onError={(e) => {
                e.currentTarget.src = defaultChainImg;
                e.currentTarget.srcset = defaultChainImg;
              }}
            />
            <span>{convertChainName(destChain.chainInfo.chainName)}</span>
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
        {renderChainDropdown()}
      </div>
    </div>
  );
};
