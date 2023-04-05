import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { useOnClickOutside } from "usehooks-ts";

import { defaultChainImg } from "~/config/constants";
import { InputWrapper } from "~/components/common";

import { ChainsDropdown } from "~/features/dest-chain-selector/ChainsDropdown";
import { useChainFilter } from "~/features/dest-chain-selector/hooks";

import { useSwapStore } from "~/store";

import { convertChainName } from "~/utils/transformers";

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
    <InputWrapper>
      <div ref={ref}>
        <label className="block text-xs">To</label>
        <div className="static w-full mt-1 dropdown dropdown-open">
          <button className="w-full" onClick={() => setDropdownOpen(true)}>
            <div className="flex items-center justify-between space-x-2 text-lg font-medium cursor-pointer">
              <div className="flex items-center gap-x-2">
                <Image
                  loading="eager"
                  src={`/assets/chains/${chainName}.logo.svg`}
                  width={35}
                  height={35}
                  onError={(e) => {
                    e.currentTarget.src = defaultChainImg;
                    e.currentTarget.srcset = defaultChainImg;
                  }}
                  alt={chainName}
                />
                <span className="capitalize">
                  {convertChainName(chainName)}
                </span>
              </div>
              <div className="flex items-center">
                <Image
                  loading="eager"
                  src="/assets/ui/arrow-down.svg"
                  width={25}
                  height={25}
                  alt="arrow-down"
                />
              </div>
            </div>
          </button>
          <ChainsDropdown
            dropdownOpen={dropdownOpen}
            filteredChains={filteredChains}
            searchChainInput={searchChainInput}
            setSearchChainInput={setSearchChainInput}
            handleOnDropdownToggle={handleOnDropdownToggle}
          />
        </div>
      </div>
    </InputWrapper>
  );
};
