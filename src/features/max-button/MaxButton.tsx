import React from "react";

import { useSwapStore } from "~/store";

import { useGetAllowedMaxBalance } from "./hooks/useGetAllowedMaxBalance";

export const MaxButton = () => {
  const setTokensToTransfer = useSwapStore(
    (state) => state.setTokensToTransfer
  );
  const { data: maxBalance, isLoading } = useGetAllowedMaxBalance();

  function handleOnMaxButtonClick() {
    setTokensToTransfer(maxBalance as string);
  }

  return (
    <button
      className="btn btn-info btn-xs"
      disabled={isLoading || !maxBalance}
      onClick={handleOnMaxButtonClick}
    >
      Max
    </button>
  );
};
