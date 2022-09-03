import { AssetConfig } from "@axelar-network/axelarjs-sdk";
import BigNumber from "bignumber.js";
import React from "react";
import toast from "react-hot-toast";

import { ENVIRONMENT, RESERVED_ADDRESSES } from "../../../config/constants";
import {
  getReservedAddresses,
  getSelectedAssetSymbol,
  useSwapStore,
} from "../../../store";
import { SwapStatus } from "../../../utils/enums";
import { renderGasFee } from "../../../utils/renderGasFee";

type Props = {
  loading: boolean;
  genDepositAddress: Function;
};

export const GenerateDepositAddressButton: React.FC<Props> = ({
  genDepositAddress,
  loading,
}) => {
  const {
    srcChain,
    destChain,
    destAddress,
    asset,
    setSwapStatus,
    tokensToTransfer,
  } = useSwapStore((state) => state);

  const reservedAddresses = useSwapStore(getReservedAddresses);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);

  function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit =
      renderGasFee(srcChain, destChain, asset as AssetConfig) || 0;
    if (new BigNumber(amount || "0") <= new BigNumber(minDeposit))
      return { minDeposit, minAmountOk: false };
    return {
      minDeposit,
      minAmountOk: true,
    };
  }

  async function handleOnGenerateDepositAddress() {
    if (!asset) return toast.error("Asset can't be empty");
    if (!Number(tokensToTransfer))
      return toast.error("Please enter the amount of tokens to transfer");
    const { minAmountOk, minDeposit } = checkMinAmount(tokensToTransfer);

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit} ${selectedAssetSymbol}`
      );
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
