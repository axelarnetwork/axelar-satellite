import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";

import { useSwapStore } from "~/store";

export const ChainSwapper = () => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const initialAsset = useSwapStore((state) => state.initialAsset);
  const asset = useSwapStore((state) => state.asset);
  const allAssets = useSwapStore((state) => state.allAssets);

  const setSrcChain = useSwapStore((state) => state.setSrcChain);
  const setDestChain = useSwapStore((state) => state.setDestChain);
  const setAsset = useSwapStore((state) => state.setAsset);
  const setInitialAsset = useSwapStore((state) => state.setInitialAsset);

  /**
   * TODO: maybe move elsewhere to avoid logic scattering
   * If asset is a native asset at app load,
   * cache the native asset so that when switch of chains occurs
   * the native asset is selected vs the wrapped version
   */
  useEffect(() => {
    if (!initialAsset) {
      setInitialAsset(asset);
    }
  }, [asset, initialAsset, setInitialAsset]);

  const updateQueryParamsAndSwitch = async () => {
    setDestChain(srcChain);
    setSrcChain(destChain);

    // if switching from a native token should choose the wrapped version
    if (
      asset?.is_gas_token &&
      asset.native_chain === srcChain.chainName?.toLowerCase()
    ) {
      const wrappedAsset = allAssets.find(
        (_asset) => _asset.id === asset.wrapped_erc20
      );
      if (!wrappedAsset) {
        return;
      }
      setAsset(wrappedAsset);
    }

    if (
      !asset?.is_gas_token &&
      asset?.native_chain === destChain.chainName?.toLowerCase() &&
      initialAsset?.wrapped_erc20 === asset.id
    ) {
      setAsset(initialAsset);
    }
  };

  return (
    <div className="relative z-40 flex items-center -mx-2">
      <div
        onClick={updateQueryParamsAndSwitch}
        className="bg-gradient-to-b text-white h-10 w-10 p-[1px] rounded-xl cursor-pointer"
      >
        <div className="flex justify-center items-center h-full w-full bg-[#398cc9] rounded-xl p-2.5">
          <div className="relative w-full h-full">
            <Image
              layout="fill"
              src="/assets/ui/double-arrows.svg"
              alt="double-arrows"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
