import { useCallback, useEffect, useState } from "react";
import Image from "next/legacy/image";
import clsx from "clsx";
import { useAccount } from "wagmi";

import { tokenContractDocs } from "~/config/constants";
import { AddressShortener } from "~/components/common";

import {
  getSelectedAssetName,
  getSelectedAssetNameDestChain,
  getSelectedAssetSymbol,
  getSelectedAsssetIsWrapped,
  getUnwrappedAssetSymbol,
  isAXLToken,
  useSwapStore,
} from "~/store";

import { useGetAssetBalance } from "~/hooks";
import { copyToClipboard } from "~/utils";
import { SwapStatus } from "~/utils/enums";
import { makeAccessibleKeysHandler } from "~/utils/react";

export const EvmAssetWarningModal = () => {
  const { asset, destChain, resetState, srcChain, swapStatus } = useSwapStore(
    (state) => state
  );
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

  const [showAssetWarning, setShowAssetWarning] = useState(false);

  useEffect(
    () => {
      if (swapStatus !== SwapStatus.WAIT_FOR_DEPOSIT) {
        return;
      }
      if (!(srcChain && destChain)) {
        return;
      }
      if (![srcChain?.module, destChain?.module].includes("evm")) {
        return;
      }

      setShowAssetWarning(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setShowAssetWarning, swapStatus]
  );

  function handleOnResetState() {
    setShowAssetWarning(false);
    resetState();
  }

  const onConfirm = useCallback(() => {
    setShowAssetWarning(false);
  }, [setShowAssetWarning]);

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
            <div>
              Only send{" "}
              <span className="font-bold">
                <>
                  {selectedAssetNameSrcChain}{" "}
                  {hasSelectedAXLToken
                    ? `(might be ${selectedAssetSymbolOnSrcChain} in Metamask)`
                    : null}{" "}
                </>
              </span>
              to this deposit address on
              <strong className="capitalize"> {srcChain.chainName}</strong>
              <div>Any other tokens sent to this address will be lost.</div>
            </div>

            <div className="py-2 text-center">
              <div className="mt-2">
                {!asset?.is_gas_token && (
                  <div className="font-light text-gray-300">
                    <>
                      {selectedAssetNameSrcChain} token contract address |{" "}
                      <strong className="capitalize">
                        {srcChain.chainName}
                      </strong>
                      <div className="flex items-center justify-center font-bold gap-x-2">
                        <AddressShortener value={tokenAddress} />
                        <div
                          {...makeAccessibleKeysHandler(
                            copyToClipboard.bind(null, tokenAddress)
                          )}
                        >
                          <Image
                            src={"/assets/ui/copy.svg"}
                            height={16}
                            width={16}
                            alt="copy address icon"
                          />
                        </div>
                      </div>
                    </>
                  </div>
                )}
              </div>
              {address && (
                <div className="mt-2">
                  <div className="font-light text-gray-300">
                    Connected wallet balance |{" "}
                    <strong className="">
                      <>
                        {balance}{" "}
                        {hasSelectedAXLToken
                          ? selectedAssetNameSrcChain
                          : selectedAssetSymbolOnSrcChain}
                      </>
                    </strong>
                    <div className="flex items-center justify-center font-bold gap-x-2">
                      <AddressShortener value={address} />
                      <div
                        {...makeAccessibleKeysHandler(
                          copyToClipboard.bind(null, address)
                        )}
                      >
                        <Image
                          src={"/assets/ui/copy.svg"}
                          height={16}
                          width={16}
                          alt="copy address icon"
                        />
                      </div>
                    </div>
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
                <>
                  {shouldUnwrapAsset &&
                  unwrappedAssetSymbol &&
                  selectedAssetIsWrappedNative
                    ? unwrappedAssetSymbol
                    : selectedAssetNameOnDestinationChain}
                </>
              </span>{" "}
              on <span className="capitalize">{destChain.chainName}</span>. If
              your recipient doesn’t support{" "}
              <span className="font-bold">
                <>
                  {shouldUnwrapAsset &&
                  unwrappedAssetSymbol &&
                  selectedAssetIsWrappedNative
                    ? unwrappedAssetSymbol
                    : selectedAssetNameOnDestinationChain}
                </>
              </span>{" "}
              <strong className="font-bold text-red-400">
                the funds will be lost!
              </strong>
            </span>
          </div>
        )}

        <div className="mt-5">
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

        {destChain.module === "axelarnet" && (
          <div className="block mt-5 bg-[#fab600] p-4 rounded-lg">
            <h2 className="mt-2 text-center text-gray-900">
              Exchange addresses that need a memo are{" "}
              <strong>NOT SUPPORTED.</strong>
            </h2>
            <h2 className="text-gray-900">
              Please do not use Satellite to make transfers to an exchange
              address requiring a memo or{" "}
              <strong className="underline">FUNDS WILL BE LOST.</strong>
            </h2>

            <h2 className="text-gray-900">
              If you wish to send assets to an exchange send them to your Keplr
              wallet address, then send them from that Keplr wallet to the
              exchange address with the required memo.
            </h2>
          </div>
        )}

        <div className="flex justify-between mt-10">
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
