import { useEffect } from "react";
import { ChainName } from "@0xsquid/sdk";

import { TokensWithExtendedChainData, useSquidStateStore } from "~/store";

import { squid } from "~/squid.config";

export const useSquidList = () => {
  const { setSquidTokens, setSquidChains, squidChains, squidTokens } =
    useSquidStateStore();

  useEffect(() => {
    getTokens();
  }, []);

  const getTokens = () => {
    // console.log("squid chains", squid.chains);
    const tokensWithExtendedChainData: TokensWithExtendedChainData[] =
      squid.tokens.map((t) => {
        const chain = squid.chains.find((c) => c.chainId === t.chainId);
        return {
          ...t,
          chainName: chain?.chainName as ChainName,
        };
      });
    // console.log("squid tokens", tokensWithExtendedChainData);
    if (squidTokens.length === 0) {
      setSquidTokens(tokensWithExtendedChainData);
    }
    if (squidChains.length === 0) {
      setSquidChains(squid.chains);
    }
  };
};
