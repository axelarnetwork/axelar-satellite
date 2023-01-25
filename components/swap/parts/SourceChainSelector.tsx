import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { getSelectedAssetSymbol, useSwapStore } from "../../../store";

import { useOnClickOutside } from "usehooks-ts";

import { ASSET_RESTRICTIONS } from "../../../config/constants";
import { convertChainName } from "../../../utils/transformers";

const defaultChainImg = "/assets/chains/default.logo.svg";

export const SourceChainSelector = () => {
  const [searchChainInput, setSearchChainInput] = useState<string>();
  const [filteredChains, setFilteredChains] = useState<ChainInfo[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    allChains,
    srcChain,
    destChain,
    setSrcChain,
    asset,
    allAssets,
    setAsset,
  } = useSwapStore((state) => state);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);

  const ref = useRef(null);
  const router = useRouter();

  // avoid same chain selection
  useEffect(() => {
    const newChains = allChains.filter(
      (chain) =>
        chain.chainName !== destChain.chainName &&
        chain.chainName !== srcChain.chainName &&
        // TODO: fix correctly
        !ASSET_RESTRICTIONS[0]?.hideSrcChains?.includes((chain as any).id)
    );
    // .filter((chain) =>
    //   chain.assets
    //     ?.map((a) => a.assetSymbol?.toLowerCase())
    //     .includes(selectedAssetSymbol?.toLowerCase())
    // );
    setFilteredChains(newChains);
  }, [srcChain, destChain, dropdownOpen, searchChainInput]);

  useEffect(() => {
    if (!router.isReady) return;
    const source = router.query.source as string;
    const srcChainName = source?.toLowerCase() || "";
    if (!srcChainName) return;

    const chain = filteredChains.find(
      (candidate) => candidate.chainName === srcChainName
    );
    if (chain) {
      console.log(2);
      setSrcChain(chain);
    }
  }, [router.query]);

  useEffect(() => {
    if (!searchChainInput) return;

    const chains = allChains.filter(
      (chain) =>
        chain.chainName?.toLowerCase().includes(searchChainInput) &&
        chain.chainName !== destChain.chainName &&
        chain.chainName !== srcChain.chainName &&
        // TODO: fix correctly
        !ASSET_RESTRICTIONS[0]?.hideSrcChains?.includes((chain as any).id)
    );
    setFilteredChains(chains);
  }, [allChains, searchChainInput]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    setDropdownOpen(!dropdownOpen);
  }

  async function handleOnSourceChainChange(chain: ChainInfo) {
    /**
     * Handle the case where the current asset is not compatible on selected source chain
     */
    const selectedChain = allChains.find((_chain) => _chain.id === chain.id);
    if (!selectedChain) return;
    const selectedChainHasAsset = selectedChain?.assets?.find(
      (_asset) => _asset.common_key === asset?.id
    );
    if (selectedChainHasAsset) {
      console.log(3);
      return setSrcChain(chain);
    }

    // if asset incompatible find fist compatible asset
    const compatibleAsset = allAssets.find(
      (_asset) =>
        !!_asset.chain_aliases[selectedChain?.chainName.toLocaleLowerCase()] &&
        !!_asset.chain_aliases[destChain?.chainName.toLocaleLowerCase()]
    );
    if (!compatibleAsset) return;
    setAsset(compatibleAsset);
    console.log(4);
    setSrcChain(chain);
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
                <button onClick={() => handleOnSourceChainChange(chain)}>
                  <Image
                    loading="eager"
                    src={`/assets/chains/${chain.chainName?.toLowerCase()}.logo.svg`}
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

  if (srcChain)
    return (
      <div ref={ref}>
        <label className="block text-xs">From</label>
        <div className="static mt-1 dropdown dropdown-open">
          <div tabIndex={0} onClick={() => setDropdownOpen(true)}>
            <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
              <Image
                loading="eager"
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
    );

  return null;
};
