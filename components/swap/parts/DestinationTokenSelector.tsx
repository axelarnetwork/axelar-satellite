import React, { useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";
import {
  getUnwrappedAssetSymbol,
  getWrappedAssetName,
  useSwapStore,
} from "store";
import { ENVIRONMENT } from "../../../config/constants";
import { Blockable } from "../../common";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const DestinationTokenSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    asset,
    srcChain,
    destChain,
    setShouldUnwrapAsset,
    shouldUnwrapAsset,
    allAssets,
  } = useSwapStore((state) => state);
  const unwrappedAssetSymbol = useSwapStore(getUnwrappedAssetSymbol);
  const wrappedAssetSymbol = useSwapStore(getWrappedAssetName);
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState(
    shouldUnwrapAsset ? unwrappedAssetSymbol : wrappedAssetSymbol
  );
  const ref = useRef(null);
  const nativeAsset = allAssets.find(
    (_asset) =>
      _asset.native_chain === destChain.chainName?.toLowerCase() &&
      _asset.is_gas_token
  );

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleOnDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = async (
    shouldUnwrap: boolean,
    assetSymbol: string | undefined
  ) => {
    if (!assetSymbol) return;
    setSelectedAssetSymbol(assetSymbol);
    setShouldUnwrapAsset(shouldUnwrap);
  };

  // gets native or wrapped token logo based on user choice
  const dynamicNativeTokenLogo = shouldUnwrapAsset
    ? nativeAsset?.id
    : asset?.id;
  // const dynamicNativeTokenLogo = asset?.common_key[ENVIRONMENT];

  function renderAssetDropdown() {
    if (!dropdownOpen || !srcChain) return null;

    return (
      <div className="left-0 w-full p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral">
        <ul tabIndex={0} onClick={handleOnDropdownToggle}>
          <li key={"native_version"}>
            <button onClick={() => handleSelect(true, unwrappedAssetSymbol)}>
              <Image
                loading="eager"
                src={`/assets/tokens/${nativeAsset?.id}.logo.svg`}
                layout="intrinsic"
                width={35}
                height={35}
                onError={(e) => {
                  e.currentTarget.src = defaultAssetImg;
                  e.currentTarget.srcset = defaultAssetImg;
                }}
                alt="asset"
              />
              <span>{unwrappedAssetSymbol}</span>
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
                src={`/assets/tokens/${asset?.id}.logo.svg`}
                layout="intrinsic"
                width={35}
                height={35}
                onError={(e) => {
                  e.currentTarget.src = defaultAssetImg;
                  e.currentTarget.srcset = defaultAssetImg;
                }}
                alt="asset"
              />
              <span>{wrappedAssetSymbol}</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }

  if (!asset) return null;

  return (
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
                  src={`/assets/tokens/${dynamicNativeTokenLogo}.logo.svg`}
                  layout="intrinsic"
                  width={30}
                  height={30}
                  alt="asset"
                  onError={(e) => {
                    e.currentTarget.src = defaultAssetImg;
                    e.currentTarget.srcset = defaultAssetImg;
                  }}
                />
                <span>{selectedAssetSymbol}</span>
                <div className="flex items-center">
                  <Image
                    loading="eager"
                    src="/assets/ui/arrow-down.svg"
                    layout="intrinsic"
                    width={35}
                    height={35}
                    alt="arrow down"
                  />
                </div>
              </div>
            </div>

            {renderAssetDropdown()}
          </div>
        </Blockable>
      </div>
    </div>
  );
};
