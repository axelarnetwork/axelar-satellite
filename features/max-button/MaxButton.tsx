import React from "react";

import { useSwapStore } from "../../store";

import { useGetAllowedMaxBalance } from "./hooks/useGetAllowedMaxBalance";

export const MaxButton = () => {
  const setTokensToTransfer = useSwapStore(
    (state) => state.setTokensToTransfer
  );
  const maxBalance = useGetAllowedMaxBalance();

  function handleOnMaxButtonClick() {
    setTokensToTransfer(maxBalance);
  }

  return (
    <button className="btn btn-info btn-xs" onClick={handleOnMaxButtonClick}>
      Max
    </button>
  );
};
