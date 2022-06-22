import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { ENVIRONMENT } from "../../../config/constants";
import { useGenerateDepositAddress } from "../../../hooks/api";
import { useSwapStore } from "../../../store";

export const GenerateDepositAddressButton = () => {
  const { srcChain, destChain, destAddress, asset } = useSwapStore(
    (state) => state
  );
  const { mutate, data } = useGenerateDepositAddress();

  function handleOnGenerateDepositAddress() {
    if (!asset) return toast.error("Asset can't be empty");
    if (!destAddress) return toast.error("Destination address can't be empty");

    mutate({
      fromChain: srcChain.chainInfo.chainIdentifier[ENVIRONMENT],
      toChain: destChain.chainInfo.chainIdentifier[ENVIRONMENT],
      asset: asset?.common_key[ENVIRONMENT],
      destAddress,
    });
  }

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

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
