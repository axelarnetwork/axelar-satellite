import { useSwapStore } from "../store";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";

export const useGetMaxTransferAmount = () => {
  const { asset, destChain } = useSwapStore((state) => state);
  const [maxTransferAmount, setMaxTransferAmount] = useState("0");

  useEffect(() => {
    if (!asset || !destChain) return;
    if (destChain.module === "axelarnet") {
      setMaxTransferAmount("0");
    } else {
      setMaxTransferAmount(
        //@ts-ignore
        asset.chain_aliases[destChain.chainName.toLowerCase()]?.mintLimit
      );
    }
  }, [destChain, asset]);

  if (!maxTransferAmount) return null;
  const amount = new BigNumber(maxTransferAmount.toString())
    .div(4)
    .div(10 ** Number(asset?.decimals))
    .toString();
  return amount;
};
