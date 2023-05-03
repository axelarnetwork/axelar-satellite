import { useMemo } from "react";
import { GetRoute } from "@0xsquid/sdk";
import { parseUnits } from "ethers/lib/utils.js";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";

import { ARBITRARY_EVM_ADDRESS, NATIVE_ASSET_IDS } from "~/config/constants";

import { useSquidStateStore, useSwapStore } from "~/store";

export function useGetSquidRouteData() {
  const srcAsset = useSwapStore((state) => state.asset);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const destAddress = useSwapStore((state) => state.destAddress);
  const {
    selectedSquidAsset,
    slippage,
    squidChains,
    setRouteDataAsync,
    setRouteData,
    setRouteDataLoading,
    enableGMPExpress,
  } = useSquidStateStore();

  const routeParams = useMemo(() => {
    if (!srcAsset || !selectedSquidAsset || !tokensToTransfer || !destAddress) {
      return {} as GetRoute;
    }
    const fromToken = srcAsset.is_gas_token
      ? ARBITRARY_EVM_ADDRESS
      : srcAsset.chain_aliases[srcChain.chainName.toLowerCase()].tokenAddress;
    const toToken = NATIVE_ASSET_IDS.includes(
      selectedSquidAsset.assetSymbol?.toLowerCase() as string
    )
      ? ARBITRARY_EVM_ADDRESS
      : (selectedSquidAsset.tokenAddress as string);
    const params: GetRoute = {
      fromChain: squidChains.find(
        (c) => c.chainName.toLowerCase() === srcChain.id
      )?.chainId as string | number,
      fromToken: String(fromToken),
      fromAmount: parseUnits(tokensToTransfer, srcAsset.decimals).toString(),
      toChain: squidChains.find(
        (c) => c.chainName.toLowerCase() === destChain.id
      )?.chainId as string | number,
      toToken,
      toAddress: destAddress,
      slippage,
      enableExpress: enableGMPExpress, // instant execution service, defaults to true
      quoteOnly: false, // optional, defaults to false
    };
    console.log("update route params", params);
    return params;
  }, [
    selectedSquidAsset,
    srcAsset,
    squidChains,
    tokensToTransfer,
    destChain,
    srcChain,
    destAddress,
    slippage,
    enableGMPExpress,
  ]);
  const debouncedRouteParams = useDebounce(routeParams, 1000);

  return useQuery(
    ["squid-route-data", debouncedRouteParams],
    async () => {
      if (!debouncedRouteParams.fromChain) {
        setRouteData(null);
        return;
      }
      setRouteDataLoading(true);

      try {
        await setRouteDataAsync(debouncedRouteParams);
      } catch (e: any) {
        console.error("Squid Route Call error: ", e);
        toast.error(
          "Selected Squid route is not supported. Please selection another chain/asset pair"
        );
      }
    },
    {
      cacheTime: 15_000,
    }
  );
}
