import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";

import { useSwapStore } from "../../../store";
import { ENVIRONMENT } from "../../../config/constants";
import { SwapOrigin } from "../../../utils/enums";
import { useGetAssetBalance } from "../../../hooks";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const TokenSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    asset,
    selectableAssetList,
    setAsset,
    srcChain,
    swapOrigin,
    tokensToTransfer,
    setTokensToTransfer,
  } = useSwapStore((state) => state);

  const [searchAssetInput, setSearchAssetInput] = useState<string>();
  const [filteredAssets, setFilteredAssets] =
    useState<AssetConfig[]>(selectableAssetList);

  const { balance } = useGetAssetBalance();
  const ref = useRef(null);

  useEffect(() => {
    if (!searchAssetInput) return setFilteredAssets(selectableAssetList);

    const chains = selectableAssetList.filter((asset) =>
      asset.common_key[ENVIRONMENT].toLowerCase().includes(searchAssetInput)
    );
    setFilteredAssets(chains);
  }, [searchAssetInput]);

  // update filtered assets state on chain change
  useEffect(() => {
    setFilteredAssets(selectableAssetList);
  }, [selectableAssetList]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    if (dropdownOpen) setFilteredAssets(selectableAssetList);
    setDropdownOpen(!dropdownOpen);
  }

  function renderTokenInput() {
    return (
      <div className="text-end">
        <input
          className="w-24 text-lg font-bold text-right bg-transparent outline-none"
          type="number"
          value={tokensToTransfer}
          onChange={(e) => setTokensToTransfer(Number(e.target.value))}
        />
        <div className="space-x-2">
          <span className="text-xs text-gray-500">Available</span>
          <span className="w-auto text-xs text-info">{balance}</span>
        </div>
      </div>
    );
  }

  function renderAssetDropdown() {
    if (!dropdownOpen) return null;

    return (
      <div className="p-2 rounded-lg shadow dropdown-content menu bg-[#02141b] left-0 w-full h-64 overflow-auto">
        <div className="px-2 py-2 ">
          <input
            className="w-full bg-[#333c42] input input-sm"
            placeholder="Search token"
            onChange={(e) => setSearchAssetInput(e.target.value)}
          />
        </div>
        <ul tabIndex={0} onClick={handleOnDropdownToggle}>
          {filteredAssets.map((asset) => {
            return (
              <li key={asset.common_key[ENVIRONMENT]}>
                <button onClick={() => setAsset(asset)}>
                  <Image
                    src={`/assets/tokens/${asset.common_key[
                      ENVIRONMENT
                    ].toLowerCase()}.logo.svg`}
                    layout="intrinsic"
                    width={40}
                    height={40}
                    onError={(e) => {
                      e.currentTarget.src = defaultAssetImg;
                      e.currentTarget.srcset = defaultAssetImg;
                    }}
                  />
                  <span>
                    {
                      asset.chain_aliases[
                        srcChain.chainInfo.chainName.toLowerCase()
                      ]?.assetName
                    }
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  function renderAssetName() {
    if (!asset) return "Select an asset";
    return asset.chain_aliases[srcChain.chainInfo.chainName.toLowerCase()]
      ?.assetName;
  }

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between h-6">
        <label className="block text-xs">I want to transfer</label>
        <div>
          {swapOrigin === SwapOrigin.APP && (
            <button className="btn btn-neutral btn-xs">Max</button>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="static flex mt-1 dropdown dropdown-open">
          <div tabIndex={0} onClick={() => setDropdownOpen(true)}>
            <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
              <Image
                src={`/assets/tokens/${asset?.common_key[ENVIRONMENT]}.logo.svg`}
                layout="intrinsic"
                width={40}
                height={40}
                onError={(e) => {
                  e.currentTarget.src = defaultAssetImg;
                  e.currentTarget.srcset = defaultAssetImg;
                }}
              />
              <span>{renderAssetName()}</span>
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

          {renderAssetDropdown()}
        </div>
        {swapOrigin === SwapOrigin.APP && renderTokenInput()}
      </div>
    </div>
  );
};
