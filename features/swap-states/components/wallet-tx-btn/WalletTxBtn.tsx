import React from "react";

import { CosmosTxBtn } from "./cosmos-tx-btn";
import { EvmTxBtn } from "./evm-tx-btn";

export const WalletTxBtn = () => {
  return (
    <div>
      <EvmTxBtn />
      <CosmosTxBtn />
    </div>
  );
};
