import React from "react";
import { SpinnerRoundFilled } from "spinners-react";
import { useDetectDestTransferConfirmation } from "../../../hooks";
import { getSelectedAssetSymbol, useSwapStore } from "../../../store";
import { InputWrapper } from "../../common";
import { TransferStats } from "../parts";
import { ProgressBar } from "./parts";

export const WaitCosmosConfirmationState = () => {
  const { srcChain, destChain } = useSwapStore((state) => state);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);
  useDetectDestTransferConfirmation();

  function renderConfirmations() {
    return (
      <div className="flex flex-col justify-center h-full text-center gap-y-1">
        <div className="flex justify-center gap-x-2">
          <div className="flex flex-col text-center">
            <h2 className="text-lg text-center">
              <span>Transfer on</span>
              <strong className="capitalize"> {srcChain.chainName} </strong>
              <span>detected!</span>
            </h2>
            <div className="text-base text-green-300">
              Your transfer will soon arrive on{" "}
              <strong className="capitalize">{destChain.chainName}</strong>
            </div>
            <div className="text-sm text-gray-300">
              You can now safely close Satellite
            </div>
            <div className="my-0 divider" />
            <div className="flex gap-x-2">
              <SpinnerRoundFilled
                className="text-blue-500"
                size={20}
                color="#00a6ff"
              />
              <div className="text-base font-light text-gray-200">
                Transfering your {selectedAssetSymbol} to {destChain.chainName}
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TransferStats />
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="relative flex flex-col h-full">
              <ProgressBar level={2} />

              <div className="flex items-center justify-center h-full py-4 mt-auto text-xs gap-x-2">
                {renderConfirmations()}
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
