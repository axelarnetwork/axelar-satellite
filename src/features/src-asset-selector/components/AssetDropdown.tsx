import React, { useEffect } from "react";
import clsx from "clsx";

import { AssetConfigExtended } from "~/types";
import { makeAccessibleKeysHandler } from "~/utils/react";

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
  // clean dropdown input on dropdown close
  useEffect(() => {
    if (!dropdownOpen) {
      setSearchAssetInput("");
    }
  }, [dropdownOpen, setSearchAssetInput]);

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
          placeholder="Search asset"
          value={searchAssetInput}
          onChange={(e) => setSearchAssetInput(e.target.value)}
        />
      </div>
      <ul
        className="overflow-auto"
        style={{ height: 300 }}
        tabIndex={0}
        {...makeAccessibleKeysHandler(handleOnDropdownToggle)}
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
