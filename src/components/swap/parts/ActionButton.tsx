import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { useGenerateDepositAddress } from "../../../hooks/api";
import { useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";
import { GenerateDepositAddressButton } from "./GenerateDepositAddressButton";

export const ActionButton = () => {
  const {
    srcChain,
    destChain,
    swapStatus,
    resetState,
    setDepositAddress,
    setIntermediaryDepositAddress,
    setSwapStatus,
  } = useSwapStore((state) => state);
  const { mutate, isLoading, isSuccess, data } = useGenerateDepositAddress();

  useEffect(() => {
    if (!isSuccess || !data) return;
    if (swapStatus !== SwapStatus.GEN_DEPOSIT_ADDRESS) return;

    Promise.resolve(data)
      .then(({ intermediaryDepositAddress, finalDepositAddress }) => {
        setDepositAddress(finalDepositAddress);
        if (intermediaryDepositAddress) {
          setIntermediaryDepositAddress(intermediaryDepositAddress);
        }
      })
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

  if (swapStatus === SwapStatus.FINISHED)
    return (
      <button className="w-full btn btn-primary" onClick={resetState}>
        <div className="flex items-center gap-3">
          <span>Make another transfer?</span>
        </div>
      </button>
    );

  return (
    <div className="flex justify-center">
      <div className="relative w-8 h-8">
        <div className="loader">
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
      </div>
    </div>
  );

  // if (swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS)
  //   return (
  //     <button className="w-full btn btn-primary cursor-not-allowedy">
  //       <div className="flex items-center gap-3">
  //         <span>Generating Deposit Address...</span>
  //       </div>
  //     </button>
  //   );
  // if (swapStatus === SwapStatus.WAIT_FOR_DEPOSIT)
  //   return (
  //     <button className="w-full cursor-not-allowed btn btn-primary">
  //       <div className="flex items-center gap-3">
  //         <span>
  //           Waiting for Deposit on <strong>{srcChain.chainName}</strong>...
  //         </span>
  //       </div>
  //     </button>
  //   );
  // if (swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION)
  //   return (
  //     <button className="w-full cursor-not-allowed btn btn-primary">
  //       <div className="flex items-center gap-3">
  //         <span>
  //           Waiting for Confirmation on <strong>{destChain.chainName}</strong>
  //           ...
  //         </span>
  //       </div>
  //     </button>
  //   );

  return null;
};
