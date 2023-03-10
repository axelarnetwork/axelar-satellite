import { useCallback, useMemo } from "react";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { useSquidStateStore } from "~/store";

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
  const { squidTokens } = useSquidStateStore();

  const checkCompatibility = useCallback(
    (asset: AssetConfigExtended) => {
      const srcSquidTokens = squidTokens
        .filter((x) => x.chainName.toLowerCase() === srcChain.id)
        .map((x) => x.symbol.toLowerCase());

      const destSquidTokens = squidTokens
        .filter((x) => x.chainName.toLowerCase() === destChain.id)
        .map((x) => x.symbol.toLowerCase());

      const intersection = srcSquidTokens.filter((x) =>
        destSquidTokens.includes(x)
      );

      const assetName =
        asset.chain_aliases[
          srcChain.chainName?.toLowerCase()
        ]?.assetName?.toLowerCase();

      const isSupportedOnSrcChain =
        srcChain?.chainName?.toLowerCase() in asset.chain_aliases ||
        intersection.includes(assetName ?? "");

      const isSupportedOnDestChain =
        destChain?.chainName?.toLowerCase() in asset.chain_aliases ||
        destSquidTokens.includes(assetName ?? "");

      const compatibilityErrorMessage = getCompatibilityErrorMessage(
        isSupportedOnSrcChain,
        isSupportedOnDestChain,
        srcChain,
        destChain
      );

      return [
        isSupportedOnSrcChain && isSupportedOnDestChain,
        compatibilityErrorMessage,
      ] as const;
    },
    [srcChain, destChain, squidTokens]
  );

  return {
    checkCompatibility,
  };
}
