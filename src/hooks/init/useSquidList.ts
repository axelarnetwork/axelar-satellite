import { useCallback, useEffect, useMemo } from "react";
import { ChainData, ChainName } from "@0xsquid/sdk";
import { useQuery } from "react-query";

import { TokensWithExtendedChainData, useSquidStateStore } from "~/store";

import { getSquidSDK } from "~/squid.config";

export const useSquidSDKQuery = () => {
  const query = useQuery(["squid-sdk"], getSquidSDK, {
    staleTime: Infinity,
  });
  return {
    ...query,
    computed: useMemo(
      () => ({
        // indexed and memoized for O(1) lookup
        chainsById: (query.data?.chains ?? []).reduce<
          Record<string, ChainData>
        >((acc, chain) => ({ ...acc, [chain.chainId]: chain }), {}),
      }),
      [query.data]
    ),
  };
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

  const { data: squid, computed } = useSquidSDKQuery();

  const getSquidTokens = useCallback(() => {
    if (!(squid && computed.chainsById)) {
      return;
    }

    const tokensWithExtendedChainData: TokensWithExtendedChainData[] =
      squid.tokens
        .filter((t) => t.symbol !== "SQD")
        .map((t) => {
          const chain = computed.chainsById[t.chainId];
          return {
            ...t,
            chainName: chain?.chainName as ChainName,
          };
        });

    if (!squidTokens.length && tokensWithExtendedChainData.length) {
      setSquidTokens(tokensWithExtendedChainData);
    }
    if (!squidChains.length && squid.chains.length) {
      setSquidChains(squid.chains);
    }
    setSquidLoaded(
      tokensWithExtendedChainData.length > 0 && squid.chains.length > 0
    );
  }, [
    squid,
    computed.chainsById,
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
