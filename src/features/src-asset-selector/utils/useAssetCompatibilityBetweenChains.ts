import { useCallback } from "react";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";

const getCompatibilityErrorMessage = (
  isSupportedOnSrcChain: boolean,
  isSupportedOnDestChain: boolean,
  srcChain: ChainInfo,
  destChain: ChainInfo
) => {
  if (isSupportedOnSrcChain && !isSupportedOnDestChain) {
    return `Asset is not available on ${destChain.chainName}`;
  }

  if (!isSupportedOnSrcChain && isSupportedOnDestChain) {
    return `Asset is not available on ${srcChain.chainName}`;
  }

  if (!(isSupportedOnSrcChain || isSupportedOnDestChain)) {
    return `Asset is not available on ${srcChain.chainName} or ${destChain.chainName}`;
  }

  return "";
};

export function useAssetCompatibilityBetweenChains(
  srcChain: ChainInfo,
  destChain: ChainInfo
) {
  const checkCompatibility = useCallback(
    (asset: AssetConfigExtended) => {
      const isSupportedOnSrcChain =
        srcChain?.chainName?.toLowerCase() in asset.chain_aliases;

      const isSupportedOnDestChain =
        destChain?.chainName?.toLowerCase() in asset.chain_aliases;

      const isSwppingToEVM = destChain.module === "evm";

      const compatibilityErrorMessage =
        asset.isSquidAsset && isSwppingToEVM
          ? ""
          : getCompatibilityErrorMessage(
              isSupportedOnSrcChain,
              isSupportedOnDestChain,
              srcChain,
              destChain
            );

      return [!compatibilityErrorMessage, compatibilityErrorMessage] as const;
    },
    [srcChain, destChain]
  );

  return {
    checkCompatibility,
  };
}
