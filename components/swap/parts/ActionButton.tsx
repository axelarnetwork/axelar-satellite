import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useGenerateDepositAddress } from "../../../hooks/api";
import { useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";
import { GenerateDepositAddressButton } from "./GenerateDepositAddressButton";

export const ActionButton = () => {
  const { swapStatus, resetState, setDepositAddress, setSwapStatus } =
    useSwapStore((state) => state);
  const { mutate, isLoading, isSuccess, data } = useGenerateDepositAddress();

  useEffect(() => {
    if (!isSuccess || !data) return;
    if (swapStatus !== SwapStatus.GEN_DEPOSIT_ADDRESS) return;

    Promise.resolve(data)
      .then((depositAddress: string) => setDepositAddress(depositAddress))
      .then(() => setSwapStatus(SwapStatus.WAIT_FOR_DEPOSIT))
      .then(() => console.log("transfer ok"))
      .catch((error) => {
        toast.error(error);
        setSwapStatus(SwapStatus.IDLE);
      });
  }, [data, isSuccess, swapStatus]);

  if (swapStatus === SwapStatus.IDLE)
    return (
      <GenerateDepositAddressButton
        genDepositAddress={mutate}
        loading={isLoading && swapStatus !== SwapStatus.IDLE}
      />
    );
  if (swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS)
    return (
      <button className="w-full btn btn-primary cursor-not-allowedy">
        <div className="flex items-center gap-3">
          <span>Processing...</span>
        </div>
      </button>
    );
  if (swapStatus === SwapStatus.WAIT_FOR_DEPOSIT)
    return (
      <button className="w-full cursor-not-allowed btn btn-primary">
        <div className="flex items-center gap-3">
          <span>Waiting for deposit...</span>
        </div>
      </button>
    );
  if (swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION)
    return (
      <button className="w-full cursor-not-allowed btn btn-primary">
        <div className="flex items-center gap-3">
          <span>Waiting for confirmation...</span>
        </div>
      </button>
    );
  if (swapStatus === SwapStatus.FINISHED)
    return (
      <button className="w-full btn btn-primary" onClick={resetState}>
        <div className="flex items-center gap-3">
          <span>Make another transfer?</span>
        </div>
      </button>
    );
  return null;
};
