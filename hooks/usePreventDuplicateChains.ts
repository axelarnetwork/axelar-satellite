import { Chain } from "@axelar-network/axelarjs-sdk";
import { useEffect, useState } from "react";
import { allChains } from "../config/web3";
import { useSwapStore } from "../store";

export const usePreventDuplicateChains = () => {
  const { srcChain, destChain, setSrcChain, setDestChain, setDestAddress } =
    useSwapStore((state) => state);
  const [originSrcChain, setOriginSrcChain] = useState<Chain>();
  const [originDestChain, setOriginDestChain] = useState<Chain>();

  useEffect(() => {
    if (srcChain.chainInfo.chainName === destChain.chainInfo.chainName)
      updateChains();

    // reset deposit address on chain module change
    if (originDestChain?.chainInfo.module !== destChain.chainInfo.module) {
      setDestAddress("");
    }

    updateCachedChains();
  }, [srcChain, destChain]);

  function updateChains() {
    const sourceChain = getChangeOrigin();
    if (sourceChain === "srcChain") {
      const newChain = allChains.find(
        (chain) => chain.chainInfo.chainName !== srcChain.chainInfo.chainName
      ) as Chain;
      setSrcChain(newChain);
    } else if (sourceChain === "destChain") {
      const newChain = allChains.find(
        (chain) => chain.chainInfo.chainName !== destChain.chainInfo.chainName
      ) as Chain;
      setDestChain(newChain);
    }
  }

  function getChangeOrigin(): "srcChain" | "destChain" | null {
    if (originSrcChain?.chainInfo?.chainName !== srcChain.chainInfo.chainName)
      return "srcChain";
    if (originDestChain?.chainInfo?.chainName !== destChain.chainInfo.chainName)
      return "destChain";
    return null;
  }

  function updateCachedChains() {
    setOriginSrcChain(srcChain);
    setOriginDestChain(destChain);
  }
};
