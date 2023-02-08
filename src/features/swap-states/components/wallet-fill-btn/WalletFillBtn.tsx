import React from "react";

import { KeplrFill } from "./KeplrFill";
import { KeplrOrTerraFill } from "./KeplrOrTerraFill";
import { MetamaskFill } from "./MetamaskFill";

export const WalletFillBtn = () => {
  return (
    <>
      <MetamaskFill />
      <KeplrFill />
      <KeplrOrTerraFill />
    </>
  );
};
