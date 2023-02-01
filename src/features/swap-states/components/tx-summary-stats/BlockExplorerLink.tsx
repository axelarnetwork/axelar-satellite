import React from "react";
import Image from "next/image";

import { AXELARSCAN_URL } from "~/config/constants";
import { getTransferType, useSwapStore } from "~/store";

import { AxelarscanLink } from "./AxelarscanLink";
import { EvmExplorerLink } from "./EvmExplorerLink";

export const BlockExplorerLink = () => {
  const destChain = useSwapStore((state) => state.destChain);
  const transferType = useSwapStore(getTransferType);

  if (transferType === "deposit-address") return <AxelarscanLink />;
  if (destChain.module === "evm") return <EvmExplorerLink />;

  return <span>BlockExplorerLink</span>;
};
