import React, { useEffect } from "react";
import Image from "next/image";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import clsx from "clsx";

import { defaultChainImg } from "~/config/constants";

import { useSwitchSrcChain } from "~/features/src-chain-selector/hooks";

import { makeAccessibleKeysHandler } from "~/utils/react";

interface Props {
  dropdownOpen: boolean;
  searchChainInput: string;
  filteredChains: ChainInfo[];
  setSearchChainInput: (value: string) => void;
  handleOnDropdownToggle: () => void;
}
export const ChainsDropdown: React.FC<Props> = ({
  dropdownOpen,
  searchChainInput,
  filteredChains,
  setSearchChainInput,
  handleOnDropdownToggle,
}) => {
  const switchChain = useSwitchSrcChain();

  // clean dropdown input on dropdown close
  useEffect(() => {
    if (!dropdownOpen) {
      setSearchChainInput("");
    }
  }, [dropdownOpen, setSearchChainInput]);

  return (
    <div
      className={clsx(
        "left-0 w-full p-2 rounded-lg shadow dropdown-content menu bg-neutral",
        {
          flex: dropdownOpen,
        },
        {
          hidden: !dropdownOpen,
        }
      )}
    >
      <div className="relative py-2 shadow-xl">
        <input
          className="w-full bg-[#333c42] input input-sm"
          placeholder="Search chain"
          value={searchChainInput}
          onChange={(e) => setSearchChainInput(e.target.value)}
        />
      </div>
      <ul
        className="overflow-auto"
        style={{ height: 300 }}
        tabIndex={0}
        {...makeAccessibleKeysHandler(handleOnDropdownToggle)}
      >
        {filteredChains.map((chain, i) => {
          const chainName = chain.chainName?.toLowerCase();
          return (
            <li
              className={clsx({
                "mt-2": i === 0,
              })}
              key={chain.chainSymbol}
            >
              <button onClick={() => switchChain(chain)}>
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
                <span className="capitalize">{chain?.chainName}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ChainsDropdown.defaultProps = {
  dropdownOpen: false,
  filteredChains: [],
};
