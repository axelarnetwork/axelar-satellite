import { AxelarQueryAPI, ChainInfo } from "@axelar-network/axelarjs-sdk";
import { formatUnits } from "ethers/lib/utils.js";
import { useQuery } from "wagmi";

import { ENVIRONMENT } from "../config/constants";
import { useSwapStore } from "../store";

export const useGetMaxTransferAmount = () => {
  const { asset, srcChain, destChain } = useSwapStore((state) => state);

  const getMaxTransferAmount = async () => {
    if (!(asset && destChain && srcChain)) {
      return "0";
    }
    const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
    const fromChainId = (srcChain as ChainInfo).id;
    const toChainId = (destChain as ChainInfo).id;
    const res = await axelarQueryApi.getTransferLimit({
      fromChainId,
      toChainId,
      denom: asset.common_key[ENVIRONMENT],
    });
    return res
      ? Number(formatUnits(res, asset.decimals)).toFixed(0)?.toString()
      : "0";
  };

  return useQuery(
    ["useMaxTransferAmount", srcChain.id, destChain.id, asset?.id],
    getMaxTransferAmount,
    { cacheTime: 10_000, staleTime: 10_000 }
  );
};
