import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { prop, uniqBy } from "rambda";
import { useOnClickOutside } from "usehooks-ts";

import { Blockable, InputWrapper } from "~/components/common";

import {
  getUnwrappedAssetSymbol,
  useSquidStateStore,
  useSwapStore,
} from "~/store";

import { useGetSquidRouteData } from "~/hooks/useGetSquidRouteData";
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
  useGetSquidRouteData();

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

  const {
    setIsSquidTrade,
    selectedSquidAsset,
    setSelectedSquidAsset,
    setRouteData,
  } = useSquidStateStore();
  const ref = useRef(null);

  const srcAssetAliasOnSrcChain = useMemo(
    () => srcAsset?.chain_aliases[srcChain.chainName.toLowerCase()],
    [srcAsset?.chain_aliases, srcChain.chainName]
  );
  const srcAssetAliasOnDestChain = useMemo(
    () => srcAsset?.chain_aliases[destChain.chainName.toLowerCase()],
    [destChain.chainName, srcAsset?.chain_aliases]
  );

  const isCompatibleWithDestinationChain = useMemo(
    () =>
      Boolean(srcAssetAliasOnDestChain) &&
      !srcAssetAliasOnDestChain?.addedViaSquid &&
      !srcAssetAliasOnSrcChain?.addedViaSquid,
    [srcAssetAliasOnDestChain, srcAssetAliasOnSrcChain]
  );

  const selectedAssetSymbol = useMemo(() => {
    if (selectedSquidAsset) {
      return selectedSquidAsset.assetSymbol;
    }
    if (shouldUnwrapAsset) {
      return unwrappedAssetSymbol;
    }

    // TODO: review this logic
    if (!isCompatibleWithDestinationChain) {
      return;
    }
    return srcAssetAliasOnDestChain?.assetName;
  }, [
    selectedSquidAsset,
    shouldUnwrapAsset,
    isCompatibleWithDestinationChain,
    srcAssetAliasOnDestChain?.assetName,
    unwrappedAssetSymbol,
  ]);

  const nativeAsset = useMemo(
    () =>
      allAssets.find(
        (asset) =>
          asset.native_chain === destChain.chainName?.toLowerCase() &&
          asset.is_gas_token
      ),
    [allAssets, destChain.chainName]
  );

  useEffect(() => {
    if (!srcAsset || !srcChain) return;

    if (isCompatibleWithDestinationChain) {
      setShouldUnwrapAsset(false);
      setRouteData(null);

      if (srcAssetAliasOnDestChain?.addedViaSquid) {
        setSelectedSquidAsset(srcAssetAliasOnDestChain);
        setIsSquidTrade(true);
      } else {
        setSelectedSquidAsset(null);
        setIsSquidTrade(false);
      }
    }
  }, [
    srcAsset,
    srcAssetAliasOnDestChain,
    destChain.chainName,
    setIsSquidTrade,
    setRouteData,
    setSelectedSquidAsset,
    setShouldUnwrapAsset,
    srcChain,
    isCompatibleWithDestinationChain,
  ]);

  const handleOnDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  const handleSelect = (shouldUnwrap: boolean) => {
    setShouldUnwrapAsset(shouldUnwrap);
    setSelectedSquidAsset(null);
    setIsSquidTrade(false);
    setRouteData(null);
  };

  const handleSquidSelect = (asset: AssetAlias) => {
    setShouldUnwrapAsset(false);
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

  const shouldRenderSquidAssets = srcIsSquidAsset && destChain.module === "evm";

  const filteredSquidAssets = useMemo(() => {
    if (shouldRenderSquidAssets) {
      const assets = isCompatibleWithDestinationChain
        ? squidAssets.filter((t) => t.id !== srcAsset?.id)
        : squidAssets;

      return uniqBy(prop("id"), assets);
    }

    return [];
  }, [
    isCompatibleWithDestinationChain,
    shouldRenderSquidAssets,
    squidAssets,
    srcAsset?.id,
  ]);

  function renderAssetDropdown() {
    if (!(dropdownOpen && srcChain)) {
      return null;
    }

    const destChainName = destChain.chainName.toLowerCase();

    return (
      <div className="left-0 w-full p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral max-h-80">
        <ul
          tabIndex={0}
          onClick={handleOnDropdownToggle}
          onKeyDown={handleOnDropdownToggle}
        >
          {isCompatibleWithDestinationChain && (
            <li key={"selected_src_asset"}>
              <button onClick={() => handleSelect(false)}>
                <AssetIcon
                  assetId={
                    srcAsset?.is_gas_token
                      ? srcAsset.wrapped_erc20
                      : srcAsset?.id
                  }
                  iconSrc={srcAsset?.iconSrc}
                  size={35}
                />
                <span>{srcAssetAliasOnDestChain?.assetSymbol}</span>
              </button>
            </li>
          )}
          {filteredSquidAssets.map((squidAsset) => (
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
                  {selectedAssetSymbol && (
                    <AssetIcon
                      assetId={
                        selectedSquidAsset?.ibcDenom ?? dynamicNativeTokenLogo
                      }
                      iconSrc={
                        selectedSquidAsset?.iconSrc ?? destSquidAsset?.logoURI
                      }
                      size={30}
                    />
                  )}
                  <span>{selectedAssetSymbol ?? "Select an asset"}</span>
                  <div className="flex items-center">
                    <Image
                      loading="eager"
                      src="/assets/ui/arrow-down.svg"
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
