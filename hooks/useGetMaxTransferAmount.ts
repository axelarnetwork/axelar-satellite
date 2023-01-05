import { useEffect, useState } from "react";

import { useSwapStore } from "../store";

import { BigNumber } from "bignumber.js";

import { ENVIRONMENT } from "../config/constants";

export const useGetMaxTransferAmount = () => {
  const { asset, srcChain, destChain } = useSwapStore((state) => state);
  const [maxTransferAmount, setMaxTransferAmount] = useState(0);

  useEffect(() => {
    if (!asset || !destChain) return;
    if (destChain.module === "axelarnet") {
      setMaxTransferAmount(0);
    } else if (
      destChain?.chainName?.toLowerCase() == "ethereum" &&
      asset.common_key[ENVIRONMENT].includes("usdc")
    ) {
      setMaxTransferAmount(10_000_000 * 1_000_000); //TODO: this is temporary with the merge
    } else {
      setMaxTransferAmount(
        (asset.chain_aliases[destChain.chainName?.toLowerCase()] as any)
          ?.mintLimit || 0
      );
    }
  }, [srcChain, destChain, asset]);

  if (!maxTransferAmount) return null;

  const bigAmount = new BigNumber(maxTransferAmount)
    ?.div(5)
    ?.div(10 ** Number(asset?.decimals))
    ?.toFixed(0);

  if (!bigAmount || isNaN(bigAmount as any)) return null;

  return BigInt(bigAmount).toString() || null;
};
