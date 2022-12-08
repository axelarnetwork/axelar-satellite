import React, { useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";
import {
  getSelectedAssetName,
  getUnwrappedAssetName,
  useSwapStore,
} from "../../../store";
import { ENVIRONMENT } from "../../../config/constants";
import { Blockable } from "../../common";
import { nativeAssets } from "../../../config/web3/evm/native-assets";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const DestinationTokenSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    asset,
    srcChain,
    destChain,
    setShouldUnwrapAsset,
    shouldUnwrapAsset,
  } = useSwapStore((state) => state);
  const unwrappedAssetName = useSwapStore(getUnwrappedAssetName);
  const [selectedAssetName, setSelectedAssetName] = useState(
    shouldUnwrapAsset
      ? unwrappedAssetName
      : asset?.chain_aliases[destChain.chainName?.toLowerCase()]?.assetName
  );
  const ref = useRef(null);
  const nativeOnDestChain = nativeAssets.find(
    (na) => na.native_chain === destChain.chainName.toLowerCase()
  );

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleOnDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = async (
    shouldUnwrap: boolean,
    selectedAssetName: string
  ) => {
    setSelectedAssetName(selectedAssetName);
    setShouldUnwrapAsset(shouldUnwrap);
  };

  function renderAssetDropdown() {
    if (!dropdownOpen || !srcChain) return null;

    return (
      <div className="left-0 w-full p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral">
        <ul tabIndex={0} onClick={handleOnDropdownToggle}>
          <li key={"native_version"}>
            <button
              onClick={() => handleSelect(true, unwrappedAssetName as string)}
            >
              <Image
                loading="eager"
                src={`/assets/tokens/${nativeOnDestChain?.common_key[
                  ENVIRONMENT
                ]?.toLowerCase()}.logo.svg`}
                layout="intrinsic"
                width={35}
                height={35}
                onError={(e) => {
                  e.currentTarget.src = defaultAssetImg;
                  e.currentTarget.srcset = defaultAssetImg;
                }}
                alt="asset"
              />
              <span>{unwrappedAssetName}</span>
            </button>
          </li>
          <li key={"wrapped_version"}>
            <button
              onClick={() =>
                handleSelect(
                  false,
                  asset?.chain_aliases[destChain.chainName?.toLowerCase()]
                    ?.assetName as string
                )
              }
            >
              <Image
                loading="eager"
                src={`/assets/tokens/${asset?.common_key[
                  ENVIRONMENT
                ]?.toLowerCase()}.logo.svg`}
                layout="intrinsic"
                width={35}
                height={35}
                onError={(e) => {
                  e.currentTarget.src = defaultAssetImg;
                  e.currentTarget.srcset = defaultAssetImg;
                }}
                alt="asset"
              />
              <span>
                {
                  asset?.chain_aliases[destChain.chainName?.toLowerCase()]
                    ?.assetName
                }
              </span>
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return asset ? (
    <div ref={ref}>
      <div className="flex items-center justify-between h-6">
        <label className="block text-xs">
          And receive on{" "}
          <span className="capitalize">{destChain.chainName}</span>:
        </label>
      </div>
      <div className="flex justify-between mt-2">
        <Blockable>
          <div className="static flex mt-1 dropdown dropdown-open">
            <div tabIndex={0} onClick={() => setDropdownOpen(true)}>
              <div className="flex items-center w-full space-x-2 text-lg font-medium cursor-pointer">
                <Image
                  loading="eager"
                  src={`/assets/tokens/${asset?.common_key[ENVIRONMENT]}.logo.svg`}
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
                  />
                </div>
              </div>
            </div>

            {renderAssetDropdown()}
          </div>
        </Blockable>
      </div>
    </div>
  ) : null;
};
