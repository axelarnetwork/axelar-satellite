import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";

import { defaultChainImg } from "~/config/constants";
import { InputWrapper } from "~/components/common";

import { ChainsDropdown } from "~/features/src-chain-selector/ChainsDropdown";
import { useChainFilter } from "~/features/src-chain-selector/hooks";

import { useSwapStore } from "~/store";

import { makeAccessibleKeysHandler } from "~/utils/react";
import { convertChainName } from "~/utils/transformers";

export const SrcChainSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchChainInput, setSearchChainInput] = useState<string>("");

  const srcChain = useSwapStore((state) => state.srcChain);
  const chainName = srcChain?.chainName?.toLowerCase();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleOnDropdownToggle = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  // handle chain filtering
  const filteredChains = useChainFilter(searchChainInput);

  return (
    <InputWrapper>
      <div ref={ref}>
        <label className="block text-xs">From</label>
        <div className="static w-full mt-1 dropdown dropdown-open">
          <div
            className="w-full"
            tabIndex={0}
            {...makeAccessibleKeysHandler(setDropdownOpen.bind(null, true))}
          >
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
    </InputWrapper>
  );
};
