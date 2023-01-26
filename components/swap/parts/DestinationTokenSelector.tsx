import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { GetRoute } from "@0xsquid/sdk";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";

import {
  getSelectedAsssetIsWrapped,
  getUnwrappedAssetSymbol,
  getWrappedAssetName,
  useSquidStateStore,
  useSwapStore,
} from "store";

import { parseUnits } from "ethers/lib/utils.js";
import { useOnClickOutside } from "usehooks-ts";

import { Blockable } from "../../common";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const DestinationTokenSelector = ({
  squidAssets,
}: {
  squidAssets: AssetInfo[];
}) => {
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
  const selectedAssetIsWrapped = useSwapStore(getSelectedAsssetIsWrapped);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const destAddress = useSwapStore((state) => state.destAddress);
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState(
    shouldUnwrapAsset ? unwrappedAssetSymbol : wrappedAssetSymbol
  );
  const {
    setIsSquidTrade,
    selectedSquidAsset,
    setSelectedSquidAsset,
    isSquidTrade,
    slippage,
    setSlippage,
    squidChains,
    setRouteDataAsync,
    setRouteData,
  } = useSquidStateStore();
  const ref = useRef(null);
  const nativeAsset = allAssets.find(
    (_asset) =>
      _asset.native_chain === destChain.chainName?.toLowerCase() &&
      _asset.is_gas_token
  );

  console.log("squid assets", squidAssets, destChain);

  useEffect(() => {
    if (asset && srcChain) {
      setShouldUnwrapAsset(false);
      setSelectedAssetSymbol(
        asset.chain_aliases[destChain.chainName.toLowerCase()].assetName
      );
      setSelectedSquidAsset(null);
      setIsSquidTrade(false);
      setRouteData(null);
    }
  }, [asset, srcChain]);

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
    setSelectedSquidAsset(null);
    setIsSquidTrade(false);
    setRouteData(null);
  };

  const handleSquidSelect = async (t: AssetInfo) => {
    console.log("t", t);
    setShouldUnwrapAsset(false);
    setSelectedAssetSymbol(t.assetSymbol);
    setSelectedSquidAsset(t);
    setIsSquidTrade(true);
    if (!asset) return;
    const params: GetRoute = {
      fromChain: squidChains.find(
        (c) => c.chainName.toLowerCase() === srcChain.id
      )?.chainId as string | number,
      fromToken:
        asset.chain_aliases[srcChain.chainName.toLowerCase()].tokenAddress,
      fromAmount: parseUnits(tokensToTransfer, asset.decimals).toString(),
      toChain: squidChains.find(
        (c) => c.chainName.toLowerCase() === destChain.id
      )?.chainId as string | number,
      toToken: t?.tokenAddress as string,
      toAddress: destAddress,
      slippage,
      enableForecall: false, // instant execution service, defaults to true
      quoteOnly: false, // optional, defaults to false
    };
    setRouteDataAsync(params);
  };

  // gets native or wrapped token logo based on user choice
  const dynamicNativeTokenLogo = shouldUnwrapAsset
    ? nativeAsset?.id
    : asset?.id;

  const srcIsSquidAsset = srcChain.assets.find(
    (t) => t.common_key === asset?.id
    // @ts-ignore
  )?.isSquidAsset;

  function renderAssetDropdown() {
    if (!dropdownOpen || !srcChain) return null;

    return (
      <div className="left-0 w-full p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral">
        <ul tabIndex={0} onClick={handleOnDropdownToggle}>
          <li key={"selected_src_asset"}>
            <button
              onClick={() =>
                handleSelect(
                  false,
                  asset?.chain_aliases[destChain.chainName.toLowerCase()]
                    .assetSymbol
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
              <span>
                {
                  asset?.chain_aliases[destChain.chainName.toLowerCase()]
                    .assetSymbol
                }
              </span>
            </button>
          </li>
          {destChain?.module === "evm" && selectedAssetIsWrapped && (
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
          )}
          {srcIsSquidAsset &&
            squidAssets.map((t) => (
              <li key={`squid_token_${t.tokenAddress}`}>
                <button onClick={() => handleSquidSelect(t)}>
                  <Image
                    loading="eager"
                    src={`/assets/tokens/${t.common_key}.logo.svg`}
                    layout="intrinsic"
                    width={35}
                    height={35}
                    onError={(e) => {
                      e.currentTarget.src = defaultAssetImg;
                      e.currentTarget.srcset = defaultAssetImg;
                    }}
                    alt="asset"
                  />
                  <span>{t.assetSymbol} (via Squid)</span>
                </button>
              </li>
            ))}
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
      <div className="flex justify-between w-full mt-2">
        <div className="static flex justify-between w-full mt-1 dropdown dropdown-open">
          <div
            tabIndex={0}
            onClick={() => setDropdownOpen(true)}
            className="w-3/4"
          >
            <div className="flex items-center w-full space-x-2 text-lg font-medium cursor-pointer">
              <Image
                loading="eager"
                src={`/assets/tokens/${
                  selectedSquidAsset?.common_key || dynamicNativeTokenLogo
                }.logo.svg`}
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

          {isSquidTrade && (
            <div className="flex flex-col w-1/2 p-2">
              <input
                type="range"
                min="0.3"
                max="99.99"
                step=".01"
                value={slippage}
                className="w-3/4 p-2 range range-primary range-xs"
                onChange={(e) => setSlippage(e.target.value as any)}
              />
              <span className="pt-2 text-xs">Slippage: {slippage}%</span>
            </div>
          )}

          {renderAssetDropdown()}
        </div>
      </div>
    </div>
  );
};
