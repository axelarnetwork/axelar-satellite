import React from "react";
import Image from "next/image";

import { getTransferType, useSwapStore } from "~/store";

import { AXELARSCAN_URL } from "~/config/constants";

import { AxelarscanLink } from "./AxelarscanLink";
import { EvmExplorerLink } from "./EvmExplorerLink";

export const BlockExplorerLink = () => {
  const destChain = useSwapStore((state) => state.destChain);
  const transferType = useSwapStore(getTransferType);

  if (transferType === "deposit-address") return <AxelarscanLink />;
  if (destChain.module === "evm") return <EvmExplorerLink />;

  return <span>BlockExplorerLink</span>;
};
