import { useEffect, useState } from "react";

import { AxelarQueryAPI, ChainInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "../store";

import { BigNumber } from "bignumber.js";
import { formatUnits } from "ethers/lib/utils.js";

import { ENVIRONMENT } from "../config/constants";

// export const useGetMaxTransferAmountOld = () => {
//   const { asset, srcChain, destChain } = useSwapStore((state) => state);
//   const [maxTransferAmount, setMaxTransferAmount] = useState(0);

//   useEffect(() => {
//     if (!asset || !destChain) return;
//     if (destChain.module === "axelarnet") {
//       setMaxTransferAmount(0);
//     } else if (
//       destChain?.chainName?.toLowerCase() == "ethereum" &&
//       asset.common_key[ENVIRONMENT].includes("usdc")
//     ) {
//       setMaxTransferAmount(10_000_000 * 1_000_000); //TODO: this is temporary with the merge
//     } else {
//       setMaxTransferAmount(
//         (asset.chain_aliases[destChain.chainName?.toLowerCase()] as any)
//           ?.mintLimit || 0
//       );
//     }
//   }, [srcChain, destChain, asset]);

//   if (!maxTransferAmount) return null;

//   const bigAmount = new BigNumber(maxTransferAmount)
//     ?.div(5)
//     ?.div(10 ** Number(asset?.decimals))
//     ?.toFixed(0);

//   if (!bigAmount || isNaN(bigAmount as any)) return null;

//   return BigInt(bigAmount).toString() || null;
// };

export const useGetMaxTransferAmount = () => {
  const { asset, srcChain, destChain } = useSwapStore((state) => state);
  const [maxTransferAmount, setMaxTransferAmount] = useState("0");

  useEffect(() => {
    if (!asset || !destChain || !srcChain) {
      setMaxTransferAmount("0");
      return;
    }
    const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
    const fromChainId = (srcChain as ChainInfo).id;
    const toChainId = (destChain as ChainInfo).id;
    axelarQueryApi
      .getTransferLimit({
        fromChainId,
        toChainId,
        denom: asset.common_key[ENVIRONMENT],
      })
      .then((res) => {
        if (res)
          setMaxTransferAmount(
            Number(formatUnits(res, asset.decimals)).toFixed(0)?.toString()
          );
        else setMaxTransferAmount("0");
      })
      .catch((e) => setMaxTransferAmount("0"));
  }, [srcChain, destChain, asset]);

  return maxTransferAmount;
};
