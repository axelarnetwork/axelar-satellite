import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ENVIRONMENT } from "../config/constants";
import { NativeAssetConfig } from "../config/nativeAssetList/testnet";
import { useSwapStore } from "../store";

/**
 * Make sure that the chains that have been selected have an asset in common
 */
export const useNormalizeChains = () => {
  const allChains = useSwapStore((state) => state.allChains);
  const allAssets = useSwapStore((state) => state.allAssets);

  const asset = useSwapStore((state) => state.asset);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);

  const setDestChain = useSwapStore((state) => state.setDestChain);
  const setAsset = useSwapStore((state) => state.setAsset);

  const router = useRouter();

  /**
   * Use the source chain as base and find a destination chain that has an asset in common with the source chain
   */
  const findFirstCompabibleChain = useCallback(() => {
    const srcAssetCommonKeys = srcChain.assets?.map((a) => a.common_key);
    const compatibleDestChain = allChains.find((chain) => {
      if (chain.chainName.toLowerCase() === srcChain.chainName.toLowerCase())
        return false;
      const assetCommonKeys = chain.assets?.map((asset) => asset?.common_key);
      return !!assetCommonKeys?.find((a) => srcAssetCommonKeys?.includes(a));
    });
    const firstAsset = srcChain?.assets?.[0] || null;
    const _asset = allAssets.find(
      (a) => a.common_key[ENVIRONMENT] === firstAsset?.common_key
    );
    setAsset(_asset as NativeAssetConfig);
    setDestChain(compatibleDestChain as ChainInfo);
  }, [allAssets, allChains, srcChain, setAsset, setDestChain]);

  /**
   * UPDATE DEST CHAIN IF ASSET IS NULL
   */
  useEffect(() => {
    if (!srcChain?.chainName || !destChain?.chainName) return;
    if (asset === null) {
      findFirstCompabibleChain();
      toast.error(
        `${router.query["asset_denom"]} not available between ${srcChain.chainName} and ${destChain.chainName}`
      );
    }
  }, [srcChain, destChain, asset, router.query, findFirstCompabibleChain]);
};
