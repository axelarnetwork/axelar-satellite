import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { toast } from "react-hot-toast";

import { useSwapStore } from "../store";

/**
 * Make sure that the chains that have been selected have an asset in common
 */
export const useNormalizeChains = () => {
  const { allChains, allAssets, asset, srcChain, destChain, setDestChain } =
    useSwapStore();
  const router = useRouter();

  /**
   * Use the source chain as base and find a destination chain that has an asset in common with the source chain
   */
  const findFirstCompatibleChain = useCallback(() => {
    const assetSymbol = srcChain.assets?.[0].assetSymbol as string;
    const compatibleDestChain = allChains.find((chain) => {
      const symbols = chain.assets?.map((asset) =>
        asset?.assetSymbol?.toLowerCase()
      );
      return symbols?.includes(assetSymbol?.toLowerCase());
    });
    setDestChain(compatibleDestChain as ChainInfo);
  }, [srcChain, setDestChain, allChains]);

  /**
   * UPDATE DEST CHAIN IF ASSET IS NULL
   */
  useEffect(() => {
    if (allChains.length === 0 || allAssets.length === 0) {
      return;
    }
    if (!(srcChain?.chainName && destChain?.chainName)) {
      return;
    }
    const timeout = setTimeout(() => {
      if (asset === null) {
        findFirstCompatibleChain();
        toast.error(
          `${router.query["asset_denom"]} not available between ${srcChain.chainName} and ${destChain.chainName}`
        );
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [
    router.query,
    srcChain,
    destChain,
    asset,
    allChains,
    allAssets,
    findFirstCompatibleChain,
  ]);
};
