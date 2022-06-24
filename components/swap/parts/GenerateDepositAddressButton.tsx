import React from "react";
import toast from "react-hot-toast";

import { ENVIRONMENT } from "../../../config/constants";
import { useGenerateDepositAddress } from "../../../hooks/api";
import { useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";

export const GenerateDepositAddressButton = () => {
  const {
    srcChain,
    destChain,
    destAddress,
    asset,
    setSwapStatus,
    setDestAddress,
  } = useSwapStore((state) => state);
  const { mutateAsync, data, isLoading } = useGenerateDepositAddress();

  async function handleOnGenerateDepositAddress() {
    if (!asset) return toast.error("Asset can't be empty");
    if (!destAddress) return toast.error("Destination address can't be empty");

    setSwapStatus(SwapStatus.GEN_DEPOSIT_ADDRESS);
    mutateAsync({
      fromChain: srcChain.chainInfo.chainIdentifier[ENVIRONMENT],
      toChain: destChain.chainInfo.chainIdentifier[ENVIRONMENT],
      asset: asset?.common_key[ENVIRONMENT],
      destAddress,
    })
      .then((depositAddress: string) => setDestAddress(depositAddress))
      .then(() => setSwapStatus(SwapStatus.WAIT_FOR_DEPOSIT))
      .catch(() => setSwapStatus(SwapStatus.IDLE));
  }

  function renderLoadingButton() {
    return (
      <div className="w-full btn btn-primary loading">
        Generating Deposit Address
      </div>
    );
  }

  if (isLoading) return renderLoadingButton();

  return (
    <div
      className="w-full btn btn-primary"
      onClick={handleOnGenerateDepositAddress}
    >
      <div className="flex items-center gap-3">
        {/* <div className="relative">
          <Image src="/assets/ui/wallet.svg" height={20} width={20} />
        </div> */}
        <span>Generate Deposit Address</span>
      </div>
    </div>
  );
};
