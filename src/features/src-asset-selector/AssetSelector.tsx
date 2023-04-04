import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";

import { Blockable, InputWrapper } from "~/components/common";

import { MaxButton } from "~/features/max-button";
import { useAssetFilter } from "~/features/src-asset-selector/hooks";

import { getSelectedAssetName, useSwapStore } from "~/store";

import { makeAccessibleKeysHandler } from "~/utils/react";

import AssetIcon from "../dest-asset-selector/components/AssetIcon";
import { AddSrcAssetButton, AssetDropdown, AssetInput } from "./components";

export const AssetSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchAssetInput, setSearchAssetInput] = useState<string>("");
  const srcChain = useSwapStore((state) => state.srcChain);
  const asset = useSwapStore((state) => state.asset);
  const selectedAssetName = useSwapStore(getSelectedAssetName);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleOnDropdownToggle = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  const filteredAssets = useAssetFilter(searchAssetInput);

  return (
    <InputWrapper>
      <div ref={ref}>
        <div className="flex items-center justify-between h-6">
          <label className="block text-xs">
            I want to transfer from{" "}
            <span className="capitalize">{srcChain.chainName}</span>
          </label>
          <div className="flex items-center">
            <AddSrcAssetButton />
            <MaxButton />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <Blockable>
            <div className="static flex mt-1 dropdown dropdown-open">
              <div
                tabIndex={0}
                {...makeAccessibleKeysHandler(setDropdownOpen.bind(null, true))}
              >
                <div className="flex items-center w-full space-x-2 text-lg font-medium cursor-pointer">
                  <AssetIcon
                    assetId={asset?.id}
                    iconSrc={asset?.iconSrc}
                    size={30}
                  />
                  <span>{selectedAssetName || "Select an Asset"}</span>
                  <div className="flex items-center">
                    <Image
                      loading="eager"
                      src="/assets/ui/arrow-down.svg"
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
    </InputWrapper>
  );
};
