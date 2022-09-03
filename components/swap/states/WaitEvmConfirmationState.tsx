import React from "react";
import Image from "next/image";

import { SpinnerRoundOutlined } from "spinners-react";
import { erc20ABI, useContractEvent } from "wagmi";
import { AXELARSCAN_URL, ENVIRONMENT } from "../../../config/constants";
import {
  getDestChainId,
  getSelectedAssetSymbol,
  useSwapStore,
} from "../../../store";
import { copyToClipboard } from "../../../utils";
import { SwapStatus } from "../../../utils/enums";
import { AddressShortener, InputWrapper } from "../../common";
import { ProgressBar } from "./parts";
import { getWagmiChains } from "../../../config/web3";
import { TransferStats } from "../parts";

export const WaitEvmConfirmationState = () => {
  const {
    asset,
    srcChain,
    destChain,
    destAddress,
    setSwapStatus,
    txInfo,
    setTxInfo,
    depositAddress,
  } = useSwapStore((state) => state);

  const chainAlias = destChain.chainIdentifier[ENVIRONMENT];
  const tokenAddress = asset?.chain_aliases[chainAlias]?.tokenAddress;

  const destChainId = useSwapStore(getDestChainId);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);

  useContractEvent({
    chainId: destChainId as number,
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
      <div className="flex flex-col justify-center h-full text-center gap-y-1">
        {/* <div>
          <h4 className="text-sm">Deposit Address</h4>
          <div className="flex justify-center text-sm font-bold text-info gap-x-2">
            <AddressShortener value={depositAddress} />
            <div
              className="cursor-pointer"
              onClick={() => copyToClipboard(depositAddress)}
            >
              <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Deposit Confirmation</h4>
          <div className="flex justify-center text-sm font-bold text-info gap-x-2">
            <AddressShortener value={txInfo.sourceTxHash} />
            <div className="flex items-center gap-x-2">
              <div
                className="cursor-pointer"
                onClick={() => copyToClipboard(txInfo.sourceTxHash as string)}
              >
                <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
              </div>
              <a
                href={`${AXELARSCAN_URL}/transfer/${txInfo.sourceTxHash}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={"/assets/ui/link.svg"} height={16} width={16} />
              </a>
            </div>
          </div>
        </div> */}
        {/* <div className="w-48 mx-auto my-1 text-xs divider" /> */}
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
              <SpinnerRoundOutlined
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
