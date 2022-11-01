import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import cn from "classnames";

import { tokenContractDocs } from "../../config/constants";
import { useGetAssetBalance } from "../../hooks";
import {
  getSelectedAssetName,
  getSelectedAssetNameDestChain,
  getSelectedAssetSymbol,
  getSelectedAssetSymbolDestinationChain,
  getUnwrappedAssetName,
  isAXLToken,
  useSwapStore,
} from "../../store";
import { copyToClipboard } from "../../utils";
import { SwapStatus } from "../../utils/enums";
import { AddressShortener } from "../common";

export const EvmAssetWarningModal = () => {
  const { asset, destChain, resetState, srcChain, swapStatus } = useSwapStore(
    (state) => state
  );
  const selectedAssetSymbolOnSrcChain = useSwapStore(getSelectedAssetSymbol);
  const unwrappedAssetName = useSwapStore(getUnwrappedAssetName);
  const { shouldUnwrapAsset } = useSwapStore((state) => state);
  const selectedAssetSymbolOnDestinationChain = useSwapStore(
    getSelectedAssetSymbolDestinationChain
  );
  const selectedAssetNameSrcChain = useSwapStore(getSelectedAssetName);
  const selectedAssetNameOnDestinationChain = useSwapStore(
    getSelectedAssetNameDestChain
  );
  const hasSelectedAXLToken = useSwapStore(isAXLToken);

  const { balance } = useGetAssetBalance();
  const { address } = useAccount();

  const [showAssetWarning, setShowAssetWarning] = useState(false);

  useEffect(() => {
    if (swapStatus !== SwapStatus.WAIT_FOR_DEPOSIT) {
      return;
    }
    if (!srcChain || !destChain) return;
    if (![srcChain?.module, destChain?.module].includes("evm")) return;

    setShowAssetWarning(true);
  }, [setShowAssetWarning, swapStatus]);

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
      className={cn(
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
                {selectedAssetNameSrcChain}{" "}
                {hasSelectedAXLToken
                  ? `(might be ${selectedAssetSymbolOnSrcChain} in Metamask)`
                  : null}{" "}
              </span>
              to this deposit address on
              <strong className="capitalize"> {srcChain.chainName}</strong>
              <div>Any other tokens sent to this address will be lost.</div>
            </div>

            <div className="py-2 text-center">
              <div className="mt-2">
                <div className="font-light text-gray-300">
                  {selectedAssetNameSrcChain} token contract address |{" "}
                  <strong className="capitalize">{srcChain.chainName}</strong>
                  <div className="flex items-center justify-center font-bold gap-x-2">
                    <AddressShortener value={tokenAddress} />
                    <div
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(tokenAddress)}
                    >
                      <Image
                        src={"/assets/ui/copy.svg"}
                        height={16}
                        width={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {address && (
                <div className="mt-2">
                  <div className="font-light text-gray-300">
                    Connected wallet balance |{" "}
                    <strong className="">
                      {balance}{" "}
                      {hasSelectedAXLToken
                        ? selectedAssetNameSrcChain
                        : selectedAssetSymbolOnSrcChain}
                    </strong>
                    <div className="flex items-center justify-center font-bold gap-x-2">
                      <AddressShortener value={address} />
                      <div
                        className="cursor-pointer"
                        onClick={() => copyToClipboard(address as string)}
                      >
                        <Image
                          src={"/assets/ui/copy.svg"}
                          height={16}
                          width={16}
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
                {shouldUnwrapAsset && unwrappedAssetName
                  ? unwrappedAssetName
                  : selectedAssetNameOnDestinationChain}
              </span>{" "}
              on <span className="capitalize">{destChain.chainName}</span>. If
              your recipient doesn’t support{" "}
              <span className="font-bold">
                {shouldUnwrapAsset && unwrappedAssetName
                  ? unwrappedAssetName
                  : selectedAssetNameOnDestinationChain}
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
