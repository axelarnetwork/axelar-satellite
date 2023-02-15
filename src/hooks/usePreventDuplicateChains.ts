import { useEffect, useState } from "react";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "../store";

export const usePreventDuplicateChains = () => {
  const {
    allChains,
    srcChain,
    destChain,
    setSrcChain,
    setDestChain,
    setDestAddress,
  } = useSwapStore((state) => state);
  const [originSrcChain, setOriginSrcChain] = useState<ChainInfo>();
  const [originDestChain, setOriginDestChain] = useState<ChainInfo>();

  useEffect(
    () => {
      if (srcChain?.chainName === destChain?.chainName) {
        updateChains();
      }

      // reset deposit address on chain module change
      if (
        originDestChain &&
        originSrcChain &&
        originDestChain?.module !== destChain?.module
      ) {
        setDestAddress("");
      }

      updateCachedChains();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [srcChain, destChain]
  );

  function updateChains() {
    const sourceChain = getChangeOrigin();
    if (sourceChain === "srcChain") {
      const newChain = allChains.find(
        (chain) => chain?.chainName !== srcChain?.chainName
      ) as ChainInfo;
      setSrcChain(newChain);
    } else if (sourceChain === "destChain") {
      const newChain = allChains.find(
        (chain) => chain?.chainName !== destChain?.chainName
      ) as ChainInfo;
      setDestChain(newChain);
    }
  }

  function getChangeOrigin(): "srcChain" | "destChain" | null {
    if (originSrcChain?.chainName !== srcChain?.chainName) {
      return "srcChain";
    }
    if (originDestChain?.chainName !== destChain?.chainName) {
      return "destChain";
    }
    return null;
  }

  function updateCachedChains() {
    if (!(srcChain && destChain)) {
      return;
    }
    setOriginSrcChain(srcChain);
    setOriginDestChain(destChain);
  }
};
