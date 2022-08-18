import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "../../../store";
import { convertChainName } from "../../../utils/transformers";
import { useRouter } from "next/router";

const defaultChainImg = "/assets/chains/default.logo.svg";

export const SourceChainSelector = () => {
  const [searchChainInput, setSearchChainInput] = useState<string>();
  const [filteredChains, setFilteredChains] = useState<ChainInfo[]>([]);  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { allChains, srcChain, setSrcChain } = useSwapStore((state) => state);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const { source } = router.query;
    const srcChainName: string = (source as string)?.toLowerCase() || "";
    if (srcChainName) {
      const chain = filteredChains.find(
        (candidate) => candidate.chainName === srcChainName
      );
      if (chain) setSrcChain(chain);
    }
  }, [router, filteredChains]);

  useEffect(() => {
    if (!searchChainInput) return setFilteredChains(allChains);

    const chains = allChains.filter((chain) =>
      chain.chainName.toLowerCase().includes(searchChainInput)
    );
    setFilteredChains(chains);
  }, [allChains, searchChainInput]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    if (dropdownOpen) setFilteredChains(allChains);
    setDropdownOpen(!dropdownOpen);
  }

  function renderChainDropdown() {
    if (!dropdownOpen) return null;

    return (
      <div className="p-2 rounded-lg shadow dropdown-content menu bg-[#02141b] left-0 w-full h-64 overflow-auto">
        <div className="px-2 py-2 ">
          <input
            className="w-full bg-[#333c42] input input-sm"
            placeholder="Search chain"
            onChange={(e) => setSearchChainInput(e.target.value)}
          />
        </div>
        <ul tabIndex={0} onClick={handleOnDropdownToggle}>
          {filteredChains.map((chain) => {
            return (
              <li key={chain.chainSymbol}>
                <button
                  onClick={() => {
                    setSrcChain(chain);
                    router.replace({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        source: chain.chainName.toLowerCase(),
                      },
                    });
                  }}
                >
                  <Image
                    src={`/assets/chains/${chain.chainName.toLowerCase()}.logo.svg`}
                    layout="intrinsic"
                    width={35}
                    height={35}
                    onError={(e) => {
                      e.currentTarget.src = defaultChainImg;
                      e.currentTarget.srcset = defaultChainImg;
                    }}
                  />
                  <span className="capitalize">{chain?.chainName}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return srcChain ? (
    <div ref={ref}>
      <label className="block text-xs">From</label>
      <div className="static mt-1 dropdown dropdown-open">
        <div tabIndex={0} onClick={() => setDropdownOpen(true)}>
          <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
            <Image
              src={`/assets/chains/${srcChain?.chainName?.toLowerCase()}.logo.svg`}
              layout="intrinsic"
              width={35}
              height={35}
              onError={(e) => {
                e.currentTarget.src = defaultChainImg;
                e.currentTarget.srcset = defaultChainImg;
              }}
            />
            <span className="capitalize">
              {convertChainName(srcChain.chainName)}
            </span>
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
  ) : null;
};
