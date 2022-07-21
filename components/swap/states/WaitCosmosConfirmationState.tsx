import React from "react";
import { SpinnerCircular } from "spinners-react";
import { erc20ABI, useContractEvent } from "wagmi";
import { ENVIRONMENT } from "../../../config/constants";
import { getWagmiChains } from "../../../config/web3";
import { useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";
import { InputWrapper } from "../../common";

export const WaitCosmosConfirmationState = () => {
  // const { asset, destChain, destAddress, setSwapStatus, setTxInfo } =
  //   useSwapStore((state) => state);

  // const wagmiChains = getWagmiChains();

  // const chainAlias = destChain.chainInfo.chainIdentifier[ENVIRONMENT];
  // const tokenAddress = asset?.chain_aliases[chainAlias]?.tokenAddress;

  // const chainId = wagmiChains.find(
  //   (chain) => chain.network === destChain.chainInfo.chainName.toLowerCase()
  // )?.id;

  // useContractEvent({
  //   chainId,
  //   addressOrName: tokenAddress as string,
  //   contractInterface: erc20ABI,
  //   eventName: "Transfer",
  //   listener: (event) => {
  //     if (event[1] === destAddress) {
  //       setTxInfo({
  //         destTxHash: event[3]?.transactionHash,
  //       });
  //       setSwapStatus(SwapStatus.FINISHED);
  //     }
  //   },
  // });

  function renderConfirmations() {
    return (
      <>
        <SpinnerCircular
          size={20}
          thickness={147}
          color={"#00a5ff"}
          secondaryColor={"#375f73"}
        />
        <span className="font-semibold">Waiting for confirmations...</span>
      </>
    );
  }

  return (
    <InputWrapper className="h-40">
      <div className="h-full space-x-2">
        <div className="flex flex-col w-full h-full">
          <div className="h-full">
            <div className="grid items-center grid-cols-5 mt-2 text-xs font-medium justify-items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                1
              </div>
              <progress
                className="h-1 progress progress-primary"
                value={1}
              ></progress>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                2
              </div>
              <progress className="h-1 progress progress-primary"></progress>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                3
              </div>
            </div>

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
