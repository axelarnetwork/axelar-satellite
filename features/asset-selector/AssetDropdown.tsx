import React, { useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";

import { AssetConfigExtended } from "types";
import { defaultAssetImg } from "config/constants";
import { useSwapStore } from "store";

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
  // clean dropdown input on dropdown close
  useEffect(() => {
    if (!dropdownOpen) setSearchAssetInput("");
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
        {filteredAssets?.map((asset, i) => {
          const assetName =
            asset.chain_aliases[srcChain.chainName?.toLowerCase()]?.assetName;
          return (
            <li
              className={classNames({
                "mt-2": i === 0,
              })}
              key={asset.id}
            >
              <button
              // onClick={() => handleOnAssetChange(asset)}
              >
                <Image
                  loading="eager"
                  src={`/assets/tokens/${asset.id}.logo.svg`}
                  layout="intrinsic"
                  width={35}
                  height={35}
                  onError={(e) => {
                    e.currentTarget.src = defaultAssetImg;
                    e.currentTarget.srcset = defaultAssetImg;
                  }}
                  alt={asset.id}
                />
                <span>{assetName}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

AssetDropdown.defaultProps = {
  dropdownOpen: false,
  filteredAssets: [],
};
