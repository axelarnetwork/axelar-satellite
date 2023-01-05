import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSwapStore } from "store";
import { convertChainName } from "utils/transformers";
import { ChainsDropdown } from "features/dest-chain-selector/ChainsDropdown";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { defaultChainImg } from "config/constants";
import { useOnClickOutside } from "usehooks-ts";
import { useChainFilter } from "features/dest-chain-selector/hooks";

// TODO: abstract the state into a zustand destChainStore

export const DestChainSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchChainInput, setSearchChainInput] = useState<string>("");
  const [filteredChains, setFilteredChains] = useState<ChainInfo[]>([]);

  const destChain = useSwapStore((state) => state.destChain);
  const chainName = destChain?.chainName?.toLowerCase();

  const allChains = useSwapStore((state) => state.allChains);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleOnDropdownToggle = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  // initial load
  useEffect(() => {
    setFilteredChains(allChains);
    // eslint-disable-next-line
  }, []);

  // handle chain filtering
  useChainFilter(searchChainInput, setFilteredChains);

  return (
    <div ref={ref}>
      <label className="block text-xs">From</label>
      <div className="static w-full mt-1 dropdown dropdown-open">
        <div
          className="w-full"
          tabIndex={0}
          onClick={() => setDropdownOpen(true)}
        >
          <div className="flex items-center justify-between space-x-2 text-lg font-medium cursor-pointer">
            <div className="flex items-center gap-x-2">
              <Image
                loading="eager"
                src={`/assets/chains/${chainName}.logo.svg`}
                layout="intrinsic"
                width={35}
                height={35}
                onError={(e) => {
                  e.currentTarget.src = defaultChainImg;
                  e.currentTarget.srcset = defaultChainImg;
                }}
                alt={chainName}
              />
              <span className="capitalize">{convertChainName(chainName)}</span>
            </div>
            <div className="flex items-center">
              <Image
                loading="eager"
                src="/assets/ui/arrow-down.svg"
                layout="intrinsic"
                width={25}
                height={25}
                alt="arrow-down"
              />
            </div>
          </div>
        </div>
        <ChainsDropdown
          dropdownOpen={dropdownOpen}
          filteredChains={filteredChains}
          searchChainInput={searchChainInput}
          setSearchChainInput={setSearchChainInput}
          handleOnDropdownToggle={handleOnDropdownToggle}
        />
      </div>
    </div>
  );
};