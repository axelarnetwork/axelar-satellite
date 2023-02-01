import { useEffect, useState } from "react";
import { AxelarQueryAPI, ChainInfo } from "@axelar-network/axelarjs-sdk";
import { formatUnits } from "ethers/lib/utils.js";

import { ENVIRONMENT } from "../config/constants";
import { useSwapStore } from "../store";

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
