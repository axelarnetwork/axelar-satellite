import { useCallback, useEffect, useMemo } from "react";
import { ChainName } from "@0xsquid/sdk";
import { useQuery } from "react-query";

import { TokensWithExtendedChainData, useSquidStateStore } from "~/store";

import { getSquidSDK } from "~/squid.config";

export const useSquidSDKQuery = () => {
  return useQuery(["squid-sdk"], getSquidSDK, {
    staleTime: Infinity,
  });
};

export const useSquidList = () => {
  const {
    setSquidTokens,
    setSquidChains,
    setSquidLoaded,
    squidChains,
    squidTokens,
    squidLoaded,
  } = useSquidStateStore();

  const { data: squid } = useSquidSDKQuery();

  const getSquidTokens = useCallback(() => {
    if (!squid) {
      return;
    }
    const tokensWithExtendedChainData: TokensWithExtendedChainData[] =
      squid.tokens.map((t) => {
        const chain = squid.chains.find((c) => c.chainId === t.chainId);
        return {
          ...t,
          chainName: chain?.chainName as ChainName,
        };
      });

    if (squidTokens.length === 0 && tokensWithExtendedChainData.length > 0) {
      setSquidTokens(tokensWithExtendedChainData);
    }
    if (squidChains.length === 0 && squid.chains.length > 0) {
      setSquidChains(squid.chains);
    }
    setSquidLoaded(squidTokens.length > 0 && squidChains.length > 0);
  }, [
    squid,
    squidTokens.length,
    squidChains.length,
    setSquidLoaded,
    setSquidTokens,
    setSquidChains,
  ]);

  useEffect(() => {
    if (squid?.initialized && !squidLoaded) {
      getSquidTokens();
    }
  }, [getSquidTokens, squid?.initialized, squidLoaded]);

  return useMemo(
    () => ({
      getSquidTokens,
      squidTokens,
    }),
    [getSquidTokens, squidTokens]
  );
};
