import React, { useEffect } from "react";

import { useGetDepositAddress } from "features/gen-address-btn/hooks";
import {
  checkAsset,
  checkDestAddressFormat,
  checkMinTransfer,
  checkReservedAddresses,
} from "features/gen-address-btn/utils";

import { RouteData } from "@0xsquid/sdk";

import {
  getReservedAddresses,
  getSrcChainId,
  useSquidStateStore,
  useSwapStore,
  useWalletStore,
} from "store";

import { squid } from "squid.config";
import { SwapStatus } from "utils/enums";
import { showErrorMsgAndThrow } from "utils/error";
import { useConnect, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import cn from "classnames";

const SquidSwapBtn = React.memo(() => {
  const { connectAsync, connectors } = useConnect();
  const { chain } = useNetwork();
  const { wagmiConnected } = useWalletStore();
  const srcChainId = useSwapStore(getSrcChainId);
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: srcChainId,
  });
  const { data: signer } = useSigner({
    onSuccess(data) {},
  });
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);

  const swapStatus = useSwapStore((state) => state.swapStatus);
  const resetState = useSwapStore((state) => state.resetState);

  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const destAddress = useSwapStore((state) => state.destAddress);

  const reservedAddresses = useSwapStore(getReservedAddresses);

  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);
  const { routeData, setTxReceipt, resetSquidState } = useSquidStateStore();

  const { loading } = useGetDepositAddress();

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
    await checkMinTransfer(tokensToTransfer, srcChain, destChain, asset);

    if (!asset || !routeData) return;

    try {
      setSwapStatus(SwapStatus.WAIT_FOR_SQUID);
      const tx = await squid.executeRoute({
        signer: signer as any,
        route: routeData as RouteData,
      });
      const txReceipt = await tx.wait();
      console.log("swap res: \n", txReceipt);
      setTxReceipt(txReceipt);
    } catch (err: any) {
      setSwapStatus(SwapStatus.IDLE);
      showErrorMsgAndThrow(
        err?.message ||
          "Could not execute route pair for asset/chain combination"
      );
    }
  }

  useEffect(() => {
    if (loading) setSwapStatus(SwapStatus.GEN_DEPOSIT_ADDRESS);
  }, [loading, setSwapStatus]);

  if ([SwapStatus.FINISHED, SwapStatus.SQUID_FINISHED].includes(swapStatus))
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

  if (swapStatus !== SwapStatus.IDLE)
    return (
      <div className="flex justify-center">
        <div className="relative w-8 h-8">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      </div>
    );

  return (
    <button
      className={cn("w-full text-base font-semibold capitalize btn", {
        "btn-primary": chain?.id === srcChainId,
        "btn-outline": chain?.id !== srcChainId,
      })}
      onClick={handleSwap}
      disabled={chain?.id === srcChainId && !routeData}
    >
      {chain?.id !== srcChainId
        ? `Switch to ${srcChain.chainName}`
        : routeData
        ? "Swap with Squid"
        : "Select A Valid Swap Path"}
    </button>
  );
});

export { SquidSwapBtn };
