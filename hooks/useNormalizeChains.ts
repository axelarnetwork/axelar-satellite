import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSwapStore } from "../store";

/**
 * Make sure that the chains that have been selected have an asset in common
 */
export const useNormalizeChains = () => {
  const { allChains, asset, srcChain, destChain, setDestChain, destAddress } =
    useSwapStore();
  const router = useRouter();

  /**
   * UPDATE DEST CHAIN IF ASSET IS NULL
   */
  useEffect(() => {
    if (!srcChain?.chainName || !destChain?.chainName) return;
    const timeout = setTimeout(() => {
      if (asset === null) {
        findFirstCompabibleChain();
        toast.error(
          `${router.query["asset_denom"]} not available between ${srcChain.chainName} and ${destChain.chainName}`
        );
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [srcChain, destChain, asset]);

  /**
   * Use the source chain as base and find a destination chain that has an asset in common with the source chain
   */
  function findFirstCompabibleChain() {
    const assetSymbol = srcChain.assets?.[0].assetSymbol as string;
    const compatibleDestChain = allChains.find((chain) => {
      const symbols = chain.assets?.map((asset) =>
        asset?.assetSymbol?.toLowerCase()
      );
      return symbols?.includes(assetSymbol.toLowerCase());
    });
    setDestChain(compatibleDestChain as ChainInfo);
  }
};
