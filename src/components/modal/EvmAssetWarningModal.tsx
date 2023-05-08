import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { pick } from "rambda";
import { useSwitchNetwork } from "wagmi";
import { useAccount } from "wagmi";

import { getWagmiChains } from "~/config/web3";

import { makeAccessibleKeysHandler } from "~/utils/react";
import { addAssetToMetamaskWithAssetConfig } from "~/utils/wallet/metamask";

import { tokenContractDocs } from "../../config/constants";
import { useGetAssetBalance } from "../../hooks";
import {
  getSelectedAssetName,
  getSelectedAssetNameDestChain,
  getSelectedAssetSymbol,
  getSelectedAsssetIsWrapped,
  getUnwrappedAssetSymbol,
  isAXLToken,
  useSwapStore,
  useWalletStore,
} from "../../store";
import { copyToClipboard } from "../../utils";
import { SwapStatus } from "../../utils/enums";
import { AddressShortener } from "../common";

export const EvmAssetWarningModal = () => {
  const { asset, destChain, resetState, srcChain, swapStatus, depositAddress } =
    useSwapStore((state) => state);
  const selectedAssetSymbolOnSrcChain = useSwapStore(getSelectedAssetSymbol);
  const unwrappedAssetSymbol = useSwapStore(getUnwrappedAssetSymbol);
  const { shouldUnwrapAsset } = useSwapStore((state) => state);
  const selectedAssetIsWrappedNative = useSwapStore(getSelectedAsssetIsWrapped);
  const selectedAssetNameSrcChain = useSwapStore(getSelectedAssetName);
  const selectedAssetNameOnDestinationChain = useSwapStore(
    getSelectedAssetNameDestChain
  );
  const hasSelectedAXLToken = useSwapStore(isAXLToken);

  const { balance } = useGetAssetBalance();
  const { address } = useAccount();
  const { wagmiConnected, wagmiConnectorId } = useWalletStore(
    pick(["wagmiConnected", "wagmiConnectorId"])
  );
  const [showAssetWarning, setShowAssetWarning] = useState(false);
  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      //@ts-ignore
      const newNetwork = data.networkNameOverride;
      const chain =
        srcChain.chainName?.toLowerCase() === newNetwork ? srcChain : destChain;
      setTimeout(() => {
        if (!asset) return;
        addAssetToMetamaskWithAssetConfig(asset, chain);
      }, 2000);
    },
  });

  useEffect(() => {
    if (swapStatus !== SwapStatus.WAIT_FOR_DEPOSIT) {
      return;
    }
    if (!srcChain || !destChain) return;
    if (![srcChain?.module, destChain?.module].includes("evm")) return;

    setShowAssetWarning(true);
  }, [setShowAssetWarning, swapStatus, destChain, srcChain]);

  function handleOnResetState() {
    setShowAssetWarning(false);
    resetState();
  }

  const onConfirm = useCallback(() => {
    setShowAssetWarning(false);
  }, [setShowAssetWarning]);

  function addTokenToMetamaskButton() {
    if (!wagmiConnected || wagmiConnectorId?.toLowerCase() !== "metamask") {
      return null;
    }

    return (
      <button
        className="cursor-pointer tooltip"
        data-tip={"Add token to Metamask"}
        onClick={() => {
          switchNetwork?.(
            getWagmiChains().find(
              (chain) =>
                chain.networkNameOverride === srcChain.chainName?.toLowerCase()
            )?.id
          );
        }}
      >
        <Image
          loading="eager"
          src={"/assets/wallets/metamask.logo.svg"}
          height={18}
          width={18}
          alt="Metamask"
        />
      </button>
    );
  }

  const FilecoinMessage = () => {
    if (!srcChain.id.includes("filecoin")) return null;

    return (
      <div className="my-5 font-bold text-center uppercase text-yellow-500/50">
        Transfers from Filecoin will take at least ~1 hour to complete due to
        the long block finality of Filecoin, so keep this in mind before
        proceeding.
      </div>
    );
  };

  const tokenAddress = asset?.chain_aliases[srcChain.chainName?.toLowerCase()]
    ?.tokenAddress as string;

  return (
    <div
      className={clsx(
        "text-center modal items-start bg-black/40 backdrop-blur-sm",
        {
          "modal-close": !showAssetWarning,
          "modal-open": !!showAssetWarning,
        }
      )}
      style={{ paddingTop: "calc(80px + 10vh)" }}
    >
      <div className="modal-box">
        {srcChain?.module === "evm" && (
          <div>
            <FilecoinMessage />
            <div>
              Only send{" "}
              <span className="font-bold">
                {selectedAssetNameSrcChain}{" "}
                {hasSelectedAXLToken
                  ? `(might be ${selectedAssetSymbolOnSrcChain} in Metamask)`
                  : null}{" "}
              </span>
              to this deposit address on
              <strong className="capitalize"> {srcChain.chainName}</strong>. Any
              other tokens sent to this address will be lost.
              {
                <span className="flex items-center justify-center font-bold gap-x-2">
                  <AddressShortener value={depositAddress} />{" "}
                  <span
                    className="cursor-pointer"
                    {...makeAccessibleKeysHandler(
                      copyToClipboard.bind(null, depositAddress)
                    )}
                  >
                    <Image
                      src={"/assets/ui/copy.svg"}
                      height={16}
                      width={16}
                      alt="Copy"
                    />
                  </span>
                </span>
              }{" "}
            </div>

            <div className="py-2 text-center">
              <div className="mt-2">
                {!asset?.is_gas_token && (
                  <div className="font-light text-gray-300">
                    {selectedAssetNameSrcChain}&apos;s address on{" "}
                    <strong className="capitalize">
                      {" "}
                      {srcChain.chainName}
                    </strong>{" "}
                    is <AddressShortener value={tokenAddress} />{" "}
                    {addTokenToMetamaskButton()}
                  </div>
                )}
              </div>
              {address && (
                <div>
                  <div className="font-light text-gray-300">
                    (Your wallet balance |{" "}
                    <strong className="">
                      {balance}{" "}
                      {hasSelectedAXLToken
                        ? selectedAssetNameSrcChain
                        : selectedAssetSymbolOnSrcChain}
                    </strong>
                    )
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {destChain?.module === "evm" && (
          <div className="mt-5">
            <span>
              The recipient will receive{" "}
              <span className="font-bold">
                {shouldUnwrapAsset &&
                unwrappedAssetSymbol &&
                selectedAssetIsWrappedNative
                  ? unwrappedAssetSymbol
                  : selectedAssetNameOnDestinationChain}
              </span>{" "}
              on <span className="capitalize">{destChain.chainName}</span>. If
              your recipient doesn&apos;t support{" "}
              <span className="font-bold">
                {shouldUnwrapAsset &&
                unwrappedAssetSymbol &&
                selectedAssetIsWrappedNative
                  ? unwrappedAssetSymbol
                  : selectedAssetNameOnDestinationChain}
              </span>{" "}
              <strong className="font-bold text-red-400">
                the funds will be lost!
              </strong>
            </span>
          </div>
        )}

        <div className="mt-2">
          All ERC20 token addresses can be verified{" "}
          <a
            href={
              tokenContractDocs[process.env.NEXT_PUBLIC_ENVIRONMENT as string]
            }
            className="link link-primary"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            here
          </a>
          .
        </div>

        {destChain.id.includes("axelar") && (
          <div className="block p-4 mt-5 rounded-lg bg-yellow-500/50">
            <h2 className="mt-2 text-center text-neutral-200">
              Exchange addresses that need a memo are <strong>NOT</strong>{" "}
              supported. Don&apos;t use Satellite to transfer to exchange
              addresses requiring a memo or <strong>FUNDS WILL BE LOST.</strong>
            </h2>

            <h2 className="mt-3 text-neutral-200">
              To send assets to an exchange, transfer them to a Keplr wallet
              address first, then send them from that Keplr wallet to the
              exchange address with the required memo.
            </h2>
          </div>
        )}

        <div className="flex justify-between mt-5">
          <button className="mx-5 btn btn-ghost" onClick={handleOnResetState}>
            Go Back
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
