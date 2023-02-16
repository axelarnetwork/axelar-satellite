import React from "react";

import { useSwapStore } from "~/store";

import { KeplrAndTerraTxBtn } from "./KeplrAndTerraTxBtn";
import { KeplrTxBtn } from "./KeplrTxBtn";

export const CosmosTxBtn = () => {
  const srcChain = useSwapStore((state) => state.srcChain);

  if (srcChain.module !== "axelarnet") {
    return null;
  }

  return (
    <>
      <KeplrTxBtn />
      <KeplrAndTerraTxBtn />
    </>
  );
};
