import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { ENVIRONMENT } from "../../../config/constants";
import { useSwapStore } from "../../../store";
import { AddressShortener, InputWrapper } from "../../common";
import { SwapOrigin } from "../../../utils/enums";
import { EvmWalletTransfer } from "./parts";

export const WaitDepositState = () => {
  const { asset, depositAddress, swapOrigin, srcChain } = useSwapStore(
    (state) => state
  );

  function handleOnCopyDestinationAddressToClipboard() {
    navigator.clipboard.writeText(depositAddress);
    toast.success("copied to clipboard!");
  }

  // function renderWallets() {
  //   if (srcChain.chainInfo.module === "evm")
  //     return (
  //       <div>
  //         <div className="flex justify-center my-2 gap-x-5">
  //           <button>
  //             <Image
  //               src="/assets/wallets/metamask.logo.svg"
  //               height={20}
  //               width={20}
  //             />
  //           </button>
  //         </div>
  //       </div>
  //     );

  //   return (
  //     <div>
  //       <div className="flex justify-center my-2 gap-x-5">
  //         <button>
  //           <Image
  //             src="/assets/wallets/terra-station.logo.svg"
  //             height={20}
  //             width={20}
  //           />
  //         </button>
  //         <button>
  //           <Image
  //             src="/assets/wallets/kepler.logo.svg"
  //             height={20}
  //             width={20}
  //           />
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <InputWrapper className="h-auto">
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
              <progress className="h-1 progress" value={0}></progress>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
                3
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 text-xs gap-x-2">
              <div>
                <label className="block text-center">
                  Please transfer{" "}
                  <strong>{asset?.common_key[ENVIRONMENT]}</strong> to
                </label>
                <div className="flex font-bold text-info gap-x-2">
                  <AddressShortener value={depositAddress} />
                  <div
                    className="cursor-pointer"
                    onClick={handleOnCopyDestinationAddressToClipboard}
                  >
                    <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
                  </div>
                </div>
              </div>
            </div>
            {swapOrigin === SwapOrigin.APP && (
              <div>
                <div className="w-48 mx-auto my-1 text-xs divider">OR USE</div>
                {srcChain.chainInfo.module === "evm" && <EvmWalletTransfer />}
              </div>
            )}
          </div>
          <div className="w-full mt-auto">
            <div className="my-0 divider" />
            <div className="w-full text-xs font-medium text-center text-gray-500">
              Execution of asset transfer
            </div>
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};
