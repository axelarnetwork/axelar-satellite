import { useCallback, useEffect, useState } from "react";

import { useSwapStore } from "~/store";

import { renderGasFee } from "~/utils/renderGasFee";

export function useGetRelayerGasFee() {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);

  const [fee, setFee] = useState<string>("0");

  const loadFee = useCallback(async () => {
    if (!(srcChain && destChain && asset)) return;
    const fee = await renderGasFee(srcChain, destChain, asset);
    setFee(fee);
  }, [asset, destChain, srcChain]);

  useEffect(() => {
    loadFee();
  }, [loadFee]);

  return fee;
}
