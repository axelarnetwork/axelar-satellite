import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSwapStore } from "../../../store";
import { useOnClickOutside } from "usehooks-ts";
import { ENVIRONMENT } from "../../../config/constants";
import { SwapOrigin } from "../../../utils/enums";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const TokenSelector = () => {
  const [imgError, setImgError] = useState(false);
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
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    setDropdownOpen(!dropdownOpen);
  }

  function renderTokenInput() {
    return (
      <div className="">
        <input
          className="w-24 text-lg font-bold text-right bg-transparent outline-none"
          type="number"
          value={tokensToTransfer}
          onChange={(e) => setTokensToTransfer(Number(e.target.value))}
        />
        <div className="space-x-2">
          <span className="text-xs text-gray-500">Available:</span>
          <span className="text-xs text-info">12000</span>
        </div>
      </div>
    );
  }

  function renderAssetDropdown() {
    if (!dropdownOpen) return null;

    return (
      <ul
        tabIndex={0}
        className="p-2 rounded-lg shadow dropdown-content menu bg-[#02141b] left-0 w-full h-64 overflow-auto"
      >
        {selectableAssetList.map((asset) => {
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
        {swapOrigin === SwapOrigin.APP && (
          <button className="btn btn-neutral btn-xs">Max</button>
        )}
      </div>
      <div className="flex justify-between mt-2">
        <div
          className="static flex mt-1 dropdown dropdown-open"
          onClick={handleOnDropdownToggle}
        >
          <div tabIndex={0}>
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
