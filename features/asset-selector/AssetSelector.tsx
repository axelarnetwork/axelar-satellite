import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import { defaultAssetImg } from "config/constants";
import { Blockable } from "components/common";

import { AddAssetButton } from "features/add-asset-button";
import { AssetDropdown } from "features/asset-selector/AssetDropdown";
import { AssetInput } from "features/asset-selector/AssetInput";
import { useAssetFilter } from "features/asset-selector/hooks";
import { MaxButton } from "features/max-button";

import { getSelectedAssetName, useSwapStore } from "store";

import { AssetConfigExtended } from "types";
import { useOnClickOutside } from "usehooks-ts";

export const AssetSelector = () => {
  const allAssets = useSwapStore((state) => state.allAssets);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchAssetInput, setSearchAssetInput] = useState<string>("");
  const [filteredAssets, setFilteredAssets] =
    useState<AssetConfigExtended[]>(allAssets);
  const srcChain = useSwapStore((state) => state.srcChain);
  const asset = useSwapStore((state) => state.asset);
  const selectedAssetName = useSwapStore(getSelectedAssetName);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleOnDropdownToggle = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  useAssetFilter(searchAssetInput, setFilteredAssets);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between h-6">
        <label className="block text-xs">
          I want to transfer from{" "}
          <span className="capitalize">{srcChain.chainName}</span>
        </label>
        <div className="flex items-center">
          <AddAssetButton />
          <MaxButton />
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Blockable>
          <div className="static flex mt-1 dropdown dropdown-open">
            <div tabIndex={0} onClick={() => setDropdownOpen(true)}>
              <div className="flex items-center w-full space-x-2 text-lg font-medium cursor-pointer">
                <Image
                  loading="eager"
                  src={`/assets/tokens/${asset?.id}.logo.svg`}
                  layout="intrinsic"
                  width={30}
                  height={30}
                  alt="asset"
                  onError={(e) => {
                    e.currentTarget.src = defaultAssetImg;
                    e.currentTarget.srcset = defaultAssetImg;
                  }}
                />
                <span>{selectedAssetName}</span>
                <div className="flex items-center">
                  <Image
                    loading="eager"
                    src="/assets/ui/arrow-down.svg"
                    layout="intrinsic"
                    width={35}
                    height={35}
                    alt="arrow-down"
                  />
                </div>
              </div>
            </div>

            <AssetDropdown
              dropdownOpen={dropdownOpen}
              searchAssetInput={searchAssetInput}
              setSearchAssetInput={setSearchAssetInput}
              filteredAssets={filteredAssets}
              handleOnDropdownToggle={handleOnDropdownToggle}
            />
          </div>
        </Blockable>
        <AssetInput />
      </div>
    </div>
  );
};
