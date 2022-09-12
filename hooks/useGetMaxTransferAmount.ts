import { useSwapStore } from "../store";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";

export const useGetMaxTransferAmount = () => {
  const { asset, srcChain, destChain } = useSwapStore((state) => state);
  const [maxTransferAmount, setMaxTransferAmount] = useState(0);

  useEffect(() => {
    if (!asset || !destChain) return;
    if (destChain.module === "axelarnet") {
      setMaxTransferAmount(0);
    } else {
      setMaxTransferAmount(
        (asset.chain_aliases[destChain.chainName.toLowerCase()] as any)
          ?.mintLimit || 0
      );
    }
  }, [srcChain, destChain, asset]);

  if (!maxTransferAmount) return null;

  const bigAmount = new BigNumber(maxTransferAmount)
    ?.div(5)
    ?.div(10 ** Number(asset?.decimals))
    ?.toFixed(0);

  if (!bigAmount || isNaN(bigAmount)) return null;

  return BigInt(bigAmount).toString() || null;
};
