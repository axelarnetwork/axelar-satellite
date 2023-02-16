import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import { GetRoute } from "@0xsquid/sdk";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { parseUnits } from "ethers/lib/utils.js";
import { useOnClickOutside } from "usehooks-ts";

import { ARBITRARY_EVM_ADDRESS, NATIVE_ASSET_IDS } from "~/config/constants";
import { Blockable, InputWrapper } from "~/components/common";

import {
  getSelectedAsssetIsWrapped,
  getUnwrappedAssetSymbol,
  useSquidStateStore,
  useSwapStore,
} from "~/store";

import {
  AddDestAssetButton,
  ReceiveTokenInfo,
  SquidParamConfig,
} from "./components";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const DestAssetSelector = ({
  squidAssets,
}: {
  squidAssets: AssetInfo[];
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const allAssets = useSwapStore((state) => state.allAssets);
  const asset = useSwapStore((state) => state.asset);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const shouldUnwrapAsset = useSwapStore((state) => state.shouldUnwrapAsset);

  const setShouldUnwrapAsset = useSwapStore(
    (state) => state.setShouldUnwrapAsset
  );

  const unwrappedAssetSymbol = useSwapStore(getUnwrappedAssetSymbol);
  const selectedAssetIsWrapped = useSwapStore(getSelectedAsssetIsWrapped);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const destAddress = useSwapStore((state) => state.destAddress);
  const {
    setIsSquidTrade,
    selectedSquidAsset,
    setSelectedSquidAsset,
    isSquidTrade,
    slippage,
    squidChains,
    setRouteDataAsync,
    setRouteData,
    setRouteDataLoading,
  } = useSquidStateStore();
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>();
  const ref = useRef(null);
  const nativeAsset = allAssets.find(
    (_asset) =>
      _asset.native_chain === destChain.chainName?.toLowerCase() &&
      _asset.is_gas_token
  );

  const getRouteData = useCallback(
    async (t: AssetInfo) => {
      if (!asset) {
        return;
      }
      const fromToken = asset.is_gas_token
        ? ARBITRARY_EVM_ADDRESS
        : asset.chain_aliases[srcChain.chainName.toLowerCase()].tokenAddress;
      const toToken = NATIVE_ASSET_IDS.includes(
        t.assetSymbol?.toLowerCase() as string
      )
        ? ARBITRARY_EVM_ADDRESS
        : (t?.tokenAddress as string);
      setRouteDataLoading(true);
      const params: GetRoute = {
        fromChain: squidChains.find(
          (c) => c.chainName.toLowerCase() === srcChain.id
        )?.chainId as string | number,
        fromToken,
        fromAmount: parseUnits(tokensToTransfer, asset.decimals).toString(),
        toChain: squidChains.find(
          (c) => c.chainName.toLowerCase() === destChain.id
        )?.chainId as string | number,
        toToken,
        toAddress: destAddress,
        slippage,
        enableForecall: false, // instant execution service, defaults to true
        quoteOnly: false, // optional, defaults to false
      };
      setRouteDataAsync(params);
    },
    [
      asset,
      srcChain.chainName,
      srcChain.id,
      setRouteDataLoading,
      squidChains,
      tokensToTransfer,
      destAddress,
      slippage,
      setRouteDataAsync,
      destChain.id,
    ]
  );

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
  }, [
    asset,
    destChain.chainName,
    setIsSquidTrade,
    setRouteData,
    setSelectedSquidAsset,
    setShouldUnwrapAsset,
    srcChain,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (
        isSquidTrade &&
        tokensToTransfer &&
        selectedSquidAsset &&
        destAddress &&
        slippage
      ) {
        getRouteData(selectedSquidAsset);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [
    tokensToTransfer,
    selectedSquidAsset,
    isSquidTrade,
    destAddress,
    slippage,
    getRouteData,
  ]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleOnDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = async (
    shouldUnwrap: boolean,
    assetSymbol: string | undefined
  ) => {
    if (!assetSymbol) {
      return;
    }
    setSelectedAssetSymbol(assetSymbol);
    setShouldUnwrapAsset(shouldUnwrap);
    setSelectedSquidAsset(null);
    setIsSquidTrade(false);
    setRouteData(null);
  };

  const handleSquidSelect = async (t: AssetInfo) => {
    setShouldUnwrapAsset(false);
    setSelectedAssetSymbol(t.assetSymbol);
    setSelectedSquidAsset(t);
    setIsSquidTrade(true);
  };

  // gets native or wrapped token logo based on user choice
  const dynamicNativeTokenLogo = shouldUnwrapAsset
    ? nativeAsset?.id
    : asset?.id;

  const srcIsSquidAsset = srcChain.assets.find(
    (t) => t.common_key === asset?.id
  )?.isSquidAsset;

  function renderAssetDropdown() {
    if (!(dropdownOpen && srcChain)) {
      return null;
    }

    return (
      <div className="left-0 w-full p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral">
        <ul
          tabIndex={0}
          onClick={handleOnDropdownToggle}
          onKeyDown={handleOnDropdownToggle}
        >
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
            destChain.module === "evm" &&
            squidAssets.map((t) => (
              <li key={`squid_token_${t.tokenAddress}${t.assetSymbol}`}>
                <button
                  onClick={() => handleSquidSelect(t)}
                  // className="flex justify-between"
                >
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
                  <div className="flex justify-between w-full">
                    <span>{t.assetSymbol}</span>
                    <div className="text-xs text-slate-400 text-end">
                      Swap via Squid
                    </div>
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  if (!asset) {
    return null;
  }

  return (
    <InputWrapper>
      <div ref={ref}>
        <div className="flex items-center justify-between h-6">
          <label className="block text-xs">
            And receive on{" "}
            <span className="capitalize">{destChain.chainName}</span>:
          </label>
          <div className="flex items-center">
            <AddDestAssetButton />
            <SquidParamConfig />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <Blockable>
            <div className="static flex justify-between w-full mt-1 dropdown dropdown-open">
              <button tabIndex={0} onClick={() => setDropdownOpen(true)}>
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
              </button>

              {renderAssetDropdown()}
            </div>
          </Blockable>
          <ReceiveTokenInfo />
        </div>
      </div>
    </InputWrapper>
  );
};
