import React, { useEffect, useMemo } from "react";

import { useGetDepositAddress } from "~/features/gen-address-btn/hooks";
import {
  checkAsset,
  checkDestAddressFormat,
  checkMinTransfer,
  checkReservedAddresses,
} from "~/features/gen-address-btn/utils";

import {
  getReservedAddresses,
  getTransferType,
  useSquidStateStore,
  useSwapStore,
} from "~/store";

import { SwapStatus } from "~/utils/enums";
import { showErrorMsgAndThrow } from "~/utils/error";

const GetAddressBtn = React.memo(() => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);

  const swapStatus = useSwapStore((state) => state.swapStatus);
  const resetState = useSwapStore((state) => state.resetState);
  const resetSquidstate = useSquidStateStore((state) => state.resetSquidState);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const destAddress = useSwapStore((state) => state.destAddress);

  const reservedAddresses = useSwapStore(getReservedAddresses);
  const transferType = useSwapStore(getTransferType);

  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);
  const setDepositAddress = useSwapStore((state) => state.setDepositAddress);
  const setIntermediaryDepositAddress = useSwapStore(
    (state) => state.setIntermediaryDepositAddress
  );

  const { loading, getDepositAddress } = useGetDepositAddress();

  async function generateDepositAddress() {
    // perform sanity checks
    checkAsset(asset, tokensToTransfer);
    checkReservedAddresses(destAddress);
    checkDestAddressFormat(destChain, destAddress);
    reservedAddresses.includes(destAddress) &&
      showErrorMsgAndThrow("Cannot send to this address");
    await checkMinTransfer(tokensToTransfer, srcChain, destChain, asset);

    if (!asset) {
      return;
    }
    // generate deposit address
    await getDepositAddress({
      fromChain: srcChain.id,
      toChain: destChain.id,
      asset,
      fromChainModule: srcChain.module,
      destAddress,
      transferType,
    })
      .then(({ finalDepositAddress, intermediaryDepositAddress }) => {
        setDepositAddress(finalDepositAddress);
        if (intermediaryDepositAddress) {
          setIntermediaryDepositAddress(intermediaryDepositAddress);
        }

        setSwapStatus(SwapStatus.WAIT_FOR_DEPOSIT);
      })
      .catch((err) => {
        // revert back to idle state if error occurs in gen of deposit address
        setSwapStatus(SwapStatus.IDLE);
        showErrorMsgAndThrow(
          err?.message || "Error generating deposit address"
        );
      });
  }

  const errorMessage = useMemo(() => {
    if (
      !tokensToTransfer ||
      tokensToTransfer === "0" ||
      Number(tokensToTransfer) <= 0
    )
      return "Enter a valid amount to transfer";

    return null;
  }, [tokensToTransfer]);

  useEffect(() => {
    if (loading) {
      setSwapStatus(SwapStatus.GEN_DEPOSIT_ADDRESS);
    }
  }, [loading, setSwapStatus]);

  if ([SwapStatus.FINISHED, SwapStatus.SQUID_FINISHED].includes(swapStatus)) {
    return (
      <button
        className="w-full btn btn-primary"
        onClick={() => {
          resetState();
          resetSquidstate();
        }}
      >
        <div className="flex items-center gap-3">
          <span>Make another transfer?</span>
        </div>
      </button>
    );
  }

  if (swapStatus !== SwapStatus.IDLE) {
    return (
      <div className="flex justify-center">
        <div className="relative w-8 h-8">
          <div className="loader">
            <div className="inner one" />
            <div className="inner two" />
            <div className="inner three" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="w-full text-base font-semibold capitalize btn btn-primary"
      onClick={generateDepositAddress}
      disabled={Boolean(errorMessage)}
    >
      {errorMessage ?? "Generate Deposit Address"}
    </button>
  );
});

export { GetAddressBtn };
