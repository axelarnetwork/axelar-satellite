import React from "react";
import { SpinnerCircular } from "spinners-react";
import { erc20ABI, useContractEvent } from "wagmi";
import { ENVIRONMENT } from "../../../config/constants";
import { getDestChainId, useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";
import { InputWrapper } from "../../common";
import { ProgressBar } from "./parts";

export const WaitEvmConfirmationState = () => {
  const {
    asset,
    srcChain,
    destChain,
    destAddress,
    setSwapStatus,
    txInfo,
    setTxInfo,
  } = useSwapStore((state) => state);

  const chainAlias = destChain.chainInfo.chainIdentifier[ENVIRONMENT];
  const tokenAddress = asset?.chain_aliases[chainAlias]?.tokenAddress;

  const destChainId = useSwapStore(getDestChainId);

  useContractEvent({
    chainId: destChainId,
    addressOrName: tokenAddress as string,
    contractInterface: erc20ABI,
    eventName: "Transfer",
    listener: (event) => {
      if (event[3].blockNumber < Number(txInfo.destStartBlockNumber)) return;
      if (event[1] === destAddress) {
        setTxInfo({
          destTxHash: event[3]?.transactionHash,
        });
        setSwapStatus(SwapStatus.FINISHED);
      }
    },
  });

  function renderConfirmations() {
    return (
      <div className="flex items-center gap-x-2">
        <SpinnerCircular
          size={20}
          thickness={147}
          color={"#00a5ff"}
          secondaryColor={"#375f73"}
        />
        <div className="flex flex-col text-center">
          <span className="text-sm">
            Transfer on {srcChain.chainInfo.chainName} detected!
          </span>
          <span className="text-xs font-light text-gray-200">
            Transfering your {asset?.common_key[ENVIRONMENT]} to{" "}
            {destChain.chainInfo.chainName}...
          </span>
        </div>
      </div>
    );
  }

  return (
    <InputWrapper className="h-40">
      <div className="h-full space-x-2">
        <div className="flex flex-col w-full h-full">
          <div className="h-full">
            <ProgressBar level={2} />

            <div className="flex items-center justify-center mt-6 text-xs gap-x-2">
              {renderConfirmations()}
            </div>
          </div>
          <div className="w-full mt-auto">
            <div className="my-0 divider" />
            <div className="w-full text-xs font-medium text-center text-gray-500">
              Waiting for confirmations
            </div>
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};
