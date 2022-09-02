import React from "react";
import toast from "react-hot-toast";

import { ENVIRONMENT, RESERVED_ADDRESSES } from "../../../config/constants";
import { getReservedAddresses, useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";

type Props = {
  loading: boolean;
  genDepositAddress: Function;
};

export const GenerateDepositAddressButton: React.FC<Props> = ({
  genDepositAddress,
  loading,
}) => {
  const { srcChain, destChain, destAddress, asset, setSwapStatus } =
    useSwapStore((state) => state);

  const reservedAddresses = useSwapStore(getReservedAddresses);

  async function handleOnGenerateDepositAddress() {
    if (!asset) return toast.error("Asset can't be empty");
    if (!destAddress) return toast.error("Destination address can't be empty");
    if (
      RESERVED_ADDRESSES?.includes(destAddress) ||
      reservedAddresses.includes(destAddress)
    )
      return toast.error("Cannot send to this address");

    setSwapStatus(SwapStatus.GEN_DEPOSIT_ADDRESS);
    genDepositAddress({
      fromChain: srcChain.chainName,
      toChain: destChain.chainName,
      asset: asset?.common_key[ENVIRONMENT],
      destAddress,
    });
  }

  function renderLoadingButton() {
    return (
      <div className="w-full btn btn-primary loading">
        Generating Deposit Address
      </div>
    );
  }

  if (loading) return renderLoadingButton();

  return (
    <div
      className="w-full btn btn-primary"
      onClick={handleOnGenerateDepositAddress}
    >
      <div className="flex items-center gap-3">
        <span>Generate Deposit Address</span>
      </div>
    </div>
  );
};
