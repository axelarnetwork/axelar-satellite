import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getSelectedAssetSymbol, useSwapStore } from "../../../store";
import { useOnClickOutside } from "usehooks-ts";
import { convertChainName } from "../../../utils/transformers";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { useRouter } from "next/router";
import { extractDenom } from "../../../utils/extractDenom";
import { ENVIRONMENT } from "../../../config/constants";

const defaultChainImg = "/assets/chains/default.logo.svg";

export const DestChainSelector = () => {
  const [searchChainInput, setSearchChainInput] = useState<string>();
  const { srcChain, allChains, setAllChains, asset } = useSwapStore();
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);
  const [filteredChains, setFilteredChains] = useState<ChainInfo[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { destChain, setDestChain } = useSwapStore((state) => state);
  const ref = useRef(null);
  const router = useRouter();

  // avoid same chain selection
  useEffect(() => {
    const newChains = allChains
      .filter(
        (chain) =>
          chain.chainName !== srcChain.chainName &&
          chain.chainName !== destChain.chainName
      )
      .filter((chain) =>
        chain.assets?.map((a) =>
          a.common_key!?.includes(asset?.common_key[ENVIRONMENT] as string)
        )
      );
    setFilteredChains(newChains);
  }, [srcChain, destChain, dropdownOpen, searchChainInput]);

  useEffect(() => {
    if (!router.isReady) return;
    const source = router.query.destination as string;
    const destChainName = source?.toLowerCase() || "";
    if (!destChainName) return;

    const chain = filteredChains.find(
      (candidate) => candidate.chainName === destChainName
    );
    if (chain) setDestChain(chain);
  }, [router.query]);

  // search chain input
  useEffect(() => {
    if (!searchChainInput) return;

    const chains = allChains.filter(
      (chain) =>
        chain.chainName.toLowerCase().includes(searchChainInput) &&
        chain.chainName !== srcChain.chainName &&
        chain.chainName !== destChain.chainName
    );
    setFilteredChains(chains);
  }, [allChains, searchChainInput]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    setDropdownOpen(!dropdownOpen);
  }

  async function handleOnDestChainChainChange(chain: ChainInfo) {
    // await router.push({
    //   query: {
    //     ...router.query,
    //     destination: chain.chainName.toLowerCase(),
    //     destination_address: "",
    //   },
    // });
    setDestChain(chain);
  }

  function renderChainDropdown() {
    if (!dropdownOpen) return null;

    return (
      <div className="left-0 w-full h-64 p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral">
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
                <button onClick={() => handleOnDestChainChainChange(chain)}>
                  <Image
                    loading="eager"
                    src={`/assets/chains/${chain?.chainName?.toLowerCase()}.logo.svg`}
                    layout="intrinsic"
                    width={35}
                    height={35}
                    onError={(e) => {
                      e.currentTarget.src = defaultChainImg;
                      e.currentTarget.srcset = defaultChainImg;
                    }}
                  />
                  <span className="capitalize">{chain.chainName}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return destChain ? (
    <div ref={ref}>
      <label className="block text-xs">To</label>
      <div className="static mt-1 dropdown dropdown-open">
        <div tabIndex={0} onClick={() => setDropdownOpen(true)}>
          <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
            <Image
              loading="eager"
              src={`/assets/chains/${destChain?.chainName?.toLowerCase()}.logo.svg`}
              layout="intrinsic"
              width={35}
              height={35}
              onError={(e) => {
                e.currentTarget.src = defaultChainImg;
                e.currentTarget.srcset = defaultChainImg;
              }}
            />
            <span className="capitalize">
              {convertChainName(destChain.chainName)}
            </span>
            <div className="flex items-center">
              <Image
                loading="eager"
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
