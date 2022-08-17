import React from "react";
import Image from "next/image";
import { ENVIRONMENT } from "../../../config/constants";
import { useSwapStore } from "../../../store";
import { AddressShortener, InputWrapper } from "../../common";
import { SwapOrigin } from "../../../utils/enums";
import { CosmosWalletTransfer, EvmWalletTransfer, ProgressBar } from "./parts";
import { copyToClipboard } from "../../../utils";

import { convertChainName } from "../../../utils/transformers";

export const WaitDepositState = () => {
  const { asset, depositAddress, destAddress, swapOrigin, srcChain } =
    useSwapStore((state) => state);

  function renderTransferInfo() {
    return (
      <div>
        <div>
          Please transfer{" "}
          <strong>{asset?.chain_aliases[srcChain.chainName].assetName}</strong>{" "}
          on {convertChainName(srcChain.chainName)} to
        </div>
      </div>
    );
  }

  return (
    <InputWrapper className="h-auto">
      <div className="h-full space-x-2">
        <div className="flex flex-col w-full h-full">
          <div className="h-full">
            <ProgressBar level={2} />

            <div className="flex items-center justify-center mt-6 text-xs gap-x-2">
              <div>
                <label className="block text-center">
                  {renderTransferInfo()}
                </label>
                <div className="flex justify-center font-bold text-info gap-x-2">
                  <AddressShortener value={depositAddress} />
                  <div
                    className="cursor-pointer"
                    onClick={() => copyToClipboard(depositAddress)}
                  >
                    <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
                  </div>
                </div>
              </div>
            </div>
            {swapOrigin === SwapOrigin.APP && (
              <div>
                <div className="w-48 mx-auto my-1 text-xs divider">OR USE</div>
                {srcChain.module === "evm" && <EvmWalletTransfer />}
                {srcChain.module === "axelarnet" && <CosmosWalletTransfer />}
              </div>
            )}
          </div>
          <div className="w-full mt-auto">
            <div className="my-0 divider" />
            <div className="w-full text-xs font-medium text-center text-gray-500">
              Execution of asset transfer to {destAddress}
            </div>
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};
