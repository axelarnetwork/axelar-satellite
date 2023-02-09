import React, { useEffect } from "react";
import classNames from "classnames";

import { useSwitchAsset } from "~/features/src-asset-selector/hooks";

import { useSwapStore } from "~/store";

import { AssetConfigExtended } from "~/types";

import { AssetDropdownItem } from "./AssetDropdownItem";

interface Props {
  dropdownOpen: boolean;
  searchAssetInput: string;
  filteredAssets: AssetConfigExtended[];
  setSearchAssetInput: (value: string) => void;
  handleOnDropdownToggle: () => void;
}

export const AssetDropdown: React.FC<Props> = ({
  dropdownOpen,
  searchAssetInput,
  filteredAssets,
  setSearchAssetInput,
  handleOnDropdownToggle,
}) => {
  const srcChain = useSwapStore((state) => state.srcChain);

  const switchAsset = useSwitchAsset();

  // clean dropdown input on dropdown close
  useEffect(() => {
    if (!dropdownOpen) {
      setSearchAssetInput("");
    }
  }, [dropdownOpen, setSearchAssetInput]);

  return (
    <div
      className={classNames(
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
          placeholder="Search asset"
          value={searchAssetInput}
          onChange={(e) => setSearchAssetInput(e.target.value)}
        />
      </div>
      <ul
        className="overflow-auto"
        style={{ height: 300 }}
        tabIndex={0}
        onClick={handleOnDropdownToggle}
      >
        {filteredAssets?.map((asset) => (
          <AssetDropdownItem key={asset.id} asset={asset} />
        ))}
      </ul>
    </div>
  );
};

AssetDropdown.defaultProps = {
  dropdownOpen: false,
  filteredAssets: [],
};
