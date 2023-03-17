import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

import { AssetAlias, AssetConfigExtended } from "~/types";

import {
  AddDestAssetButton,
  ReceiveTokenInfo,
  SquidParamConfig,
} from "./components";
import AssetIcon from "./components/AssetIcon";
import { GMPEToggle } from "./components/GMPEToggle";

export const DestAssetSelector = ({
  squidAssets,
}: {
  squidAssets: AssetConfigExtended[];
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const allAssets = useSwapStore((state) => state.allAssets);
  const srcAsset = useSwapStore((state) => state.asset);
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

  const nativeAsset = useMemo(
    () =>
      allAssets.find(
        (asset) =>
          asset.native_chain === destChain.chainName?.toLowerCase() &&
          asset.is_gas_token
      ),
    [allAssets, destChain.chainName]
  );

  const getRouteData = useCallback(
    async (asset: AssetInfo) => {
      if (!srcAsset) {
        return;
      }
      const fromToken = srcAsset.is_gas_token
        ? ARBITRARY_EVM_ADDRESS
        : srcAsset.chain_aliases[srcChain.chainName.toLowerCase()].tokenAddress;
      const toToken = NATIVE_ASSET_IDS.includes(
        asset.assetSymbol?.toLowerCase() as string
      )
        ? ARBITRARY_EVM_ADDRESS
        : (asset?.tokenAddress as string);
      setRouteDataLoading(true);
      const params: GetRoute = {
        fromChain: squidChains.find(
          (c) => c.chainName.toLowerCase() === srcChain.id
        )?.chainId as string | number,
        fromToken: String(fromToken),
        fromAmount: parseUnits(tokensToTransfer, srcAsset.decimals).toString(),
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
      srcAsset,
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
    if (srcAsset && srcChain) {
      setShouldUnwrapAsset(false);
      setSelectedAssetSymbol(
        srcAsset.chain_aliases[destChain.chainName.toLowerCase()]?.assetName
      );
      setSelectedSquidAsset(null);
      setIsSquidTrade(false);
      setRouteData(null);
    }
  }, [
    srcAsset,
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

  const handleOnDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleSelect = (
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

  const handleSquidSelect = (asset: AssetAlias) => {
    setShouldUnwrapAsset(false);
    setSelectedAssetSymbol(asset.assetSymbol);
    setSelectedSquidAsset(asset);
    setIsSquidTrade(true);
  };

  // gets native or wrapped token logo based on user choice
  const dynamicNativeTokenLogo = shouldUnwrapAsset
    ? nativeAsset?.id
    : srcAsset?.id;

  const srcIsSquidAsset = useMemo(
    () =>
      srcAsset?.isSquidAsset ||
      srcChain.assets.find((t) => t.common_key === srcAsset?.id)?.isSquidAsset,
    [srcAsset, srcChain.assets]
  );

  const squidTokens = useSquidStateStore((state) => state.squidTokens);

  const destSquidAsset = squidTokens.find(
    (t) => t.symbol.toLowerCase() === selectedAssetSymbol?.toLowerCase()
  );

  function renderAssetDropdown() {
    if (!(dropdownOpen && srcChain)) {
      return null;
    }

    const shouldRenderSquidAssets =
      srcIsSquidAsset && destChain.module === "evm";

    const destChainName = destChain.chainName.toLowerCase();

    const assetSymbol = srcAsset?.chain_aliases[destChainName]?.assetSymbol;

    return (
      <div className="left-0 w-full p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral max-h-80">
        <ul
          tabIndex={0}
          onClick={handleOnDropdownToggle}
          onKeyDown={handleOnDropdownToggle}
        >
          <li key={"selected_src_asset"}>
            <button onClick={() => handleSelect(false, assetSymbol)}>
              <AssetIcon
                assetId={srcAsset?.id}
                iconSrc={srcAsset?.iconSrc}
                size={35}
              />
              <span>
                {
                  srcAsset?.chain_aliases[destChain.chainName.toLowerCase()]
                    ?.assetSymbol
                }
              </span>
            </button>
          </li>
          {destChain?.module === "evm" && selectedAssetIsWrapped && (
            <li key={"native_version"}>
              <button onClick={() => handleSelect(true, unwrappedAssetSymbol)}>
                <AssetIcon
                  size={35}
                  assetId={nativeAsset?.id}
                  iconSrc={nativeAsset?.iconSrc}
                />
                <span>{unwrappedAssetSymbol}</span>
              </button>
            </li>
          )}
          {shouldRenderSquidAssets &&
            squidAssets.map((squidAsset) => (
              <li key={`squid_token_${squidAsset.id}`}>
                <button
                  onClick={() =>
                    handleSquidSelect(squidAsset.chain_aliases[destChainName])
                  }
                >
                  <AssetIcon
                    assetId={squidAsset.id}
                    size={35}
                    iconSrc={squidAsset.iconSrc}
                  />
                  <div className="flex justify-between w-full">
                    <span>
                      {squidAsset.chain_aliases[destChainName]?.assetSymbol}
                    </span>
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

  if (!srcAsset) {
    return null;
  }

  return (
    <InputWrapper>
      <div ref={ref}>
        <div className="relative flex items-center justify-between h-10">
          <label className="block text-xs">
            And receive on{" "}
            <span className="capitalize">{destChain.chainName}</span>:
          </label>
          <div className="absolute top-0 right-0 grid justify-items-stretch">
            <AddDestAssetButton />
            <div className="flex flex-row">
              <GMPEToggle />
              <SquidParamConfig />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Blockable>
            <div className="static flex justify-between w-full mt-1 dropdown dropdown-open">
              <button tabIndex={0} onClick={() => setDropdownOpen(true)}>
                <div className="flex items-center w-full space-x-2 text-lg font-medium cursor-pointer">
                  <AssetIcon
                    assetId={
                      selectedSquidAsset?.common_key ?? dynamicNativeTokenLogo
                    }
                    iconSrc={
                      selectedSquidAsset?.iconSrc ?? destSquidAsset?.logoURI
                    }
                    size={30}
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
