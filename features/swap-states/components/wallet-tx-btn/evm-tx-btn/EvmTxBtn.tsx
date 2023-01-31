import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { getSelectedAssetName, getSrcChainId, useSwapStore } from "store";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useSendErc20 } from "./hooks";
import { useGetRelayerGasFee } from "hooks";
import BigNumber from "bignumber.js";
import toast from "react-hot-toast";

export const EvmTxBtn = () => {
  const { chain } = useNetwork();
  const srcChain = useSwapStore((state) => state.srcChain);
  const asset = useSwapStore((state) => state.asset);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const srcChainId = useSwapStore(getSrcChainId);
  const assetName = useSwapStore(getSelectedAssetName);
  const relayerGasFee = useGetRelayerGasFee();

  const { loading, sendErc20 } = useSendErc20();
  const { switchNetwork } = useSwitchNetwork({
    chainId: srcChainId,
  });

  function handleOnClick() {
    // switch network if user is not on correct network
    if (chain?.id !== srcChainId) return switchNetwork?.();

    // check that token provided in the asset input are greated than relayer fees
    const minAmountOk = new BigNumber(tokensToTransfer || "0").gt(
      new BigNumber(relayerGasFee)
    );
    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${relayerGasFee} ${assetName}`
      );

    // wrap tokens
    if (
      asset?.is_gas_token &&
      asset.native_chain === srcChain.chainName.toLowerCase()
    )
      // TODO: add wrap logic
      return;

    // normal tokens transfer
    sendErc20?.();
  }

  return (
    <div>
      <div className="max-w-xs pb-4 mx-auto text-sm divider">OR</div>
      <div className="flex justify-center">
        <button
          className={clsx(
            "mb-5 btn",
            chain?.id === srcChainId && "btn-primary",
            chain?.id !== srcChainId && "btn-outline",
            loading && "loading"
          )}
          onClick={handleOnClick}
        >
          <span className="mr-2">
            {chain?.id !== srcChainId
              ? `Switch to ${srcChain.chainName}`
              : "Send From Metamask"}
          </span>
          <div className="flex justify-center my-2 gap-x-5">
            <Image
              src="/assets/wallets/metamask.logo.svg"
              height={30}
              width={30}
              alt="metamask"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
