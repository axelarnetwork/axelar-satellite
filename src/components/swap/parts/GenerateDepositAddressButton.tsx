import React from "react";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";
import BigNumber from "bignumber.js";
import toast from "react-hot-toast";

import { ENVIRONMENT, RESERVED_ADDRESSES } from "../../../config/constants";
import {
  getReservedAddresses,
  getSelectedAssetSymbol,
  getTransferType,
  useSwapStore,
} from "../../../store";
import {
  validateCosmosAddress,
  validateEvmAddress,
} from "../../../utils/address";
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
  const transferType = useSwapStore(getTransferType);

  async function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit = (await renderGasFee(srcChain, destChain, asset)) || 0;
    if (new BigNumber(amount || "0").lte(new BigNumber(minDeposit))) {
      return { minDeposit, minAmountOk: false };
    }
    return {
      minDeposit,
      minAmountOk: true,
    };
  }

  async function handleOnGenerateDepositAddress() {
    if ((srcChain as any).id === "terra") {
      return toast.error(
        "Only the transfers to Terra Classic are allowed for uluna and uusd"
      );
    }
    if (!asset) {
      return toast.error("Asset can't be empty");
    }
    if (!Number(tokensToTransfer)) {
      return toast.error("Please enter the amount of tokens to transfer");
    }

    if (!checkDestAddressFormat()) {
      return;
    }
    const { minAmountOk, minDeposit } = await checkMinAmount(tokensToTransfer);

    if (!minAmountOk) {
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit} ${selectedAssetSymbol}`
      );
    }
    if (!destAddress) {
      return toast.error("Destination address can't be empty");
    }
    if (
      RESERVED_ADDRESSES?.includes(destAddress) ||
      reservedAddresses.includes(destAddress)
    ) {
      return toast.error("Cannot send to this address");
    }

    genDepositAddress({
      fromChain: srcChain.chainIdentifier[ENVIRONMENT],
      fromChainModule: srcChain.module,
      toChain: destChain.chainIdentifier[ENVIRONMENT],
      asset,
      destAddress,
      transferType,
    });

    setSwapStatus(SwapStatus.GEN_DEPOSIT_ADDRESS);
  }

  function checkDestAddressFormat() {
    const destModule = destChain.module;
    if (destModule === "evm") {
      const addressOk = validateEvmAddress(destAddress);
      if (!addressOk) {
        toast.error(`Address ${destAddress} is not a valid EVM address`);
        return false;
      }
    } else if (destModule === "axelarnet") {
      const addressOk = validateCosmosAddress(
        destAddress,
        destChain.addressPrefix
      );
      if (!addressOk) {
        toast.error(
          `Address ${destAddress.substring(0, 10)}... is not a valid ${
            destChain.chainSymbol
          } address`
        );
        return false;
      }
    }

    return true;
  }

  function renderLoadingButton() {
    return (
      <div className="w-full text-lg btn btn-primary loading">
        Generating Deposit Address
      </div>
    );
  }

  if (loading) {
    return renderLoadingButton();
  }

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
