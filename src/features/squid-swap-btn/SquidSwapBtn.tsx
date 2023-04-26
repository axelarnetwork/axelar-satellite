import React, { useEffect, useMemo } from "react";
import { RouteData } from "@0xsquid/sdk";
import clsx from "clsx";
import { useConnect, useNetwork, useSigner, useSwitchNetwork } from "wagmi";

import { useGetDepositAddress } from "~/features/gen-address-btn/hooks";
import {
  checkAsset,
  checkDestAddressFormat,
  checkReservedAddresses,
} from "~/features/gen-address-btn/utils";

import {
  getReservedAddresses,
  getSrcChainId,
  useSquidStateStore,
  useSwapStore,
  useWalletStore,
} from "~/store";

import { squid } from "~/squid.config";
import { validateCosmosAddress, validateEvmAddress } from "~/utils/address";
import { SwapStatus } from "~/utils/enums";
import { showErrorMsgAndThrow } from "~/utils/error";

import { parseSquidError } from ".";

const SquidSwapBtn = React.memo(() => {
  const { connectAsync, connectors } = useConnect();
  const { chain } = useNetwork();
  const { wagmiConnected } = useWalletStore();
  const srcChainId = useSwapStore(getSrcChainId);
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: srcChainId,
  });
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);
  const { data: signer } = useSigner({
    chainId: srcChainId,
  });

  const swapStatus = useSwapStore((state) => state.swapStatus);
  const resetState = useSwapStore((state) => state.resetState);

  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const destAddress = useSwapStore((state) => state.destAddress);

  const reservedAddresses = useSwapStore(getReservedAddresses);

  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);
  const { routeData, setTxReceipt, resetSquidState, routeDataLoading } =
    useSquidStateStore();

  const { loading } = useGetDepositAddress();

  const errorMessage = useMemo(() => {
    // Estimating swaps for input
    if (routeDataLoading) return "Estimating swaps for input.";

    // Invalid destination address
    const isValidCosmosAddress = validateCosmosAddress(
      destAddress,
      destChain.addressPrefix
    );
    const isValidEvmAddress = validateEvmAddress(destAddress);
    if (!isValidCosmosAddress && !isValidEvmAddress)
      return "Enter a valid destination address";

    // Invalid amount to swap
    if (
      !tokensToTransfer ||
      tokensToTransfer === "0" ||
      Number(tokensToTransfer) <= 0
    )
      return "Enter a valid amount to swap";

    // Restricted destination address
    if (reservedAddresses.includes(destAddress))
      return "Cannot send to this address";

    // No valid route found
    if (!routeData) return "No valid route found. Choose another pair.";

    return null;
  }, [
    routeDataLoading,
    destAddress,
    destChain.addressPrefix,
    tokensToTransfer,
    reservedAddresses,
    routeData,
  ]);

  const btnText = useMemo(() => {
    if (chain?.id !== srcChainId) {
      return `Switch to ${srcChain.chainName}`;
    }

    return errorMessage ?? "Swap with Squid";
  }, [chain?.id, srcChainId, errorMessage, srcChain.chainName]);

  async function handleOnMetamaskSwitch() {
    const connector = connectors.find((c) => c.name === "MetaMask");
    return connectAsync({ connector });
  }

  async function handleSwap() {
    if (!wagmiConnected) {
      await handleOnMetamaskSwitch();
      return;
    }
    if (chain?.id !== srcChainId) {
      await switchNetworkAsync?.();
      return;
    }
    // perform sanity checks
    checkAsset(asset, tokensToTransfer);
    checkReservedAddresses(destAddress);
    checkDestAddressFormat(destChain, destAddress);
    reservedAddresses.includes(destAddress) &&
      showErrorMsgAndThrow("Cannot send to this address");

    if (!(asset && routeData)) {
      return;
    }

    try {
      setSwapStatus(SwapStatus.WAIT_FOR_SQUID);

      if (!signer) {
        throw new Error("Signer not found");
      }

      const tx = await squid.executeRoute({
        signer,
        route: routeData as RouteData,
      });
      const txReceipt = await tx.wait();
      console.log("swap res: \n", txReceipt);
      setTxReceipt(txReceipt);
    } catch (err) {
      console.log({
        err,
      });
      setSwapStatus(SwapStatus.IDLE);
      showErrorMsgAndThrow(parseSquidError((err as Error)?.message));
    }
  }

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
          resetSquidState();
          resetState();
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
    <div className="tooltip" data-tip={errorMessage}>
      <button
        className={clsx("w-full text-base font-semibold capitalize btn", {
          "btn-primary": chain?.id === srcChainId,
          "btn-outline": chain?.id !== srcChainId,
        })}
        onClick={handleSwap}
        disabled={
          (chain?.id === srcChainId && !routeData) ||
          routeDataLoading ||
          errorMessage !== null
        }
      >
        {btnText}
      </button>
    </div>
  );
});

export { SquidSwapBtn };
