import React from "react";
import Image from "next/image";
import { useSwapStore } from "../../../store";

export const ChainSwapper = () => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);
  const allAssets = useSwapStore((state) => state.allAssets);

  const setSrcChain = useSwapStore((state) => state.setSrcChain);
  const setDestChain = useSwapStore((state) => state.setDestChain);
  const setAsset = useSwapStore((state) => state.setAsset);

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
      if (!wrappedAsset) return;
      setAsset(wrappedAsset);
    }
  };

  return (
    <div
      onClick={updateQueryParamsAndSwitch}
      className="bg-gradient-to-b from-[#00fbfb] to-[#0066ff] h-10 w-10 p-[1px] rounded-xl cursor-pointer"
    >
      <div className="flex justify-center items-center h-full w-full bg-gradient-to-b from-[#00343d] to-[#001f3f] rounded-xl p-2.5">
        <div className="relative w-full h-full">
          <Image
            layout="fill"
            src="/assets/ui/double-arrows.svg"
            alt="double-arrows"
          />
        </div>
      </div>
    </div>
  );
};
