import React from "react";
import Image from "next/image";
import BigNumber from "bignumber.js";
import { clsx } from "clsx";
import { pick } from "rambda";
import toast from "react-hot-toast";
import { useNetwork, useSwitchNetwork } from "wagmi";

import {
  getSelectedAssetName,
  getSrcChainId,
  useSwapStore,
  useWalletStore,
} from "~/store";

import { useGetRelayerGasFee } from "~/hooks";

import { useSendErc20, useSendNative } from "./hooks";

export const EvmTxBtn = () => {
  const { chain } = useNetwork();
  const srcChain = useSwapStore((state) => state.srcChain);
  const asset = useSwapStore((state) => state.asset);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const srcChainId = useSwapStore(getSrcChainId);
  const assetName = useSwapStore(getSelectedAssetName);
  const { data: relayerGasFee } = useGetRelayerGasFee();
  const { wagmiConnectorId } = useWalletStore(pick(["wagmiConnectorId"]));

  const { loading: loadingErc20Tx, sendErc20 } = useSendErc20();
  const { loading: loadingNativeTx, sendNative } = useSendNative();
  const { switchNetwork } = useSwitchNetwork({
    chainId: srcChainId,
  });

  function handleOnClick() {
    // switch network if user is not on correct network
    if (chain?.id !== srcChainId) {
      return switchNetwork?.();
    }

    // check that token provided in the asset input are greated than relayer fees
    const minAmountOk = new BigNumber(tokensToTransfer || "0").gt(
      new BigNumber(relayerGasFee as string)
    );
    if (!minAmountOk) {
      return toast.error(
        `Token amount to transfer should be bigger than ${relayerGasFee} ${assetName}`
      );
    }

    // wrap tokens
    if (
      asset?.is_gas_token &&
      asset.native_chain === srcChain.chainName.toLowerCase()
    ) {
      return sendNative?.();
    }

    // normal tokens transfer
    sendErc20?.();
  }

  if (srcChain.module !== "evm") {
    return null;
  }

  return (
    <div>
      <div className="max-w-xs pb-4 mx-auto text-sm divider">OR</div>
      <div className="flex justify-center">
        <button
          className={clsx("mb-5 btn", {
            "btn-primary": chain?.id === srcChainId,
            "btn-outline": chain?.id !== srcChainId,
            loading: loadingErc20Tx || loadingNativeTx,
          })}
          onClick={handleOnClick}
        >
          <span className="mr-2">
            {chain?.id !== srcChainId
              ? `Switch to ${srcChain.chainName}`
              : `Send From ${wagmiConnectorId}`}
          </span>
          <div className="flex justify-center my-2 gap-x-5">
            <Image
              src={`/assets/wallets/${
                wagmiConnectorId?.toLowerCase() ?? "metamask"
              }.logo.svg`}
              height={30}
              width={30}
              alt={`${wagmiConnectorId} Logo`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
