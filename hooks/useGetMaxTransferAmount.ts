import { useSwapStore } from "../store";
import { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber } from "ethers";

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

  return maxTransferAmount
    ? formatUnits(BigNumber.from(maxTransferAmount).div(4), asset?.decimals)
    : null;
};
