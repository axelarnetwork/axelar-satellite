import React from "react";
import Image from "next/image";

import { AddressShortener, InputWrapper } from "components/common";

import { getSelectedAssetSymbol, useSwapStore } from "store";

import { useGetRelayerGasFee } from "hooks";
import { copyToClipboard } from "utils";
import { SwapStatus } from "utils/enums";
import { convertChainName } from "utils/transformers";

import { ProgressBar, WalletTxBtn } from "../components";

export const SrcChainTxExecution = () => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const depositAddress = useSwapStore((state) => state.depositAddress);

  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);

  const relayerFee = useGetRelayerGasFee();

  if (swapStatus !== SwapStatus.WAIT_FOR_DEPOSIT) return null;

  return (
    <>
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="h-full">
              <ProgressBar currentLevel={2} maxLevels={4} />
              <div className="flex items-center justify-center py-4 text-sm gap-x-2">
                <div>
                  <label className="block text-center">
                    <div>
                      <div>
                        Please transfer{" "}
                        <strong>
                          {">"}
                          {relayerFee} {selectedAssetSymbol}
                        </strong>{" "}
                        on{" "}
                        <span className="capitalize">
                          {convertChainName(srcChain.chainName)}
                        </span>{" "}
                        to
                      </div>
                    </div>
                  </label>
                  <div className="flex justify-center font-bold text-info gap-x-2">
                    <AddressShortener value={depositAddress} />
                    <div
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(depositAddress)}
                    >
                      <Image
                        src="/assets/ui/copy.svg"
                        height={16}
                        width={16}
                        alt="copy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <WalletTxBtn />
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
