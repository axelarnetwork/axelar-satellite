import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { allChains } from "../../../config/chains";
import { useSwapStore } from "../../../store";
import { useOnClickOutside } from "usehooks-ts";
import { convertChainName } from "../../../utils/transformers";

export const DestChainSelector = () => {
  const [imgError, setImgError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { destChain, setDestChain } = useSwapStore((state) => state);
  const ref = useRef(null);

  useEffect(() => {
    setImgError(false);
  }, [destChain]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    setDropdownOpen(!dropdownOpen);
  }

  function getChainImg() {
    if (imgError) return "/assets/chains/default.logo.svg";
    return `/assets/chains/${destChain.chainInfo.chainSymbol.toLowerCase()}.logo.svg`;
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
                {chain.chainInfo.chainName}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <label className="block text-xs">To</label>
      <div
        className="static dropdown dropdown-open"
        onClick={handleOnDropdownToggle}
      >
        <div tabIndex={0}>
          <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
            <Image
              src={getChainImg()}
              layout="intrinsic"
              width={40}
              height={40}
              onError={() => setImgError(true)}
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
