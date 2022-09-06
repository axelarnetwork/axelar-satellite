import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import cn from "classnames";

import { tokenContractDocs } from "../../config/constants";
import { useGetAssetBalance } from "../../hooks";
import { getSelectedAssetSymbol, useSwapStore } from "../../store";
import { copyToClipboard } from "../../utils";
import { SwapStatus } from "../../utils/enums";
import { AddressShortener } from "../common";

export const EvmAssetWarningModal = () => {
  const { asset, destChain, resetState, srcChain, swapStatus } = useSwapStore(
    (state) => state
  );
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);

  const { balance } = useGetAssetBalance();
  const { address } = useAccount();

  const [showAssetWarning, setShowAssetWarning] = useState(false);
  const [userAcknowledged, setUserAcknowledged] = useState(false);

  useEffect(() => {
    if (userAcknowledged) return;
    if (swapStatus !== SwapStatus.WAIT_FOR_DEPOSIT) {
      userAcknowledged && setUserAcknowledged(false);
      return;
    }
    if (!srcChain || !destChain) return;
    if (![srcChain?.module, destChain?.module].includes("evm")) return;

    setShowAssetWarning(true);
  }, [setShowAssetWarning, userAcknowledged, swapStatus]);

  function handleOnResetState() {
    setShowAssetWarning(false);
    resetState();
  }

  const onConfirm = useCallback(() => {
    setUserAcknowledged(true);
    setShowAssetWarning(false);
  }, [setShowAssetWarning, setUserAcknowledged]);

  const tokenAddress = asset?.chain_aliases[srcChain.chainName.toLowerCase()]
    .tokenAddress as string;

  return (
    <div
      className={cn("text-center modal items-start bg-black bg-opacity-50", {
        "modal-close": !showAssetWarning,
        "modal-open": !!showAssetWarning,
      })}
      style={{ paddingTop: "calc(80px + 10vh)" }}
    >
      <div className="modal-box">
        {srcChain?.module === "evm" && (
          <div>
            <div>
              Only send{" "}
              <span className="font-bold">{selectedAssetSymbol} </span>
              to this deposit address on
              <strong className="capitalize"> {srcChain.chainName}</strong>
              <div>Any other tokens sent to this address will be lost.</div>
            </div>

            <div className="py-2 text-center">
              <div className="mt-2">
                <div className="font-light text-gray-300">
                  {selectedAssetSymbol} token contract address |{" "}
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
                      {balance} {selectedAssetSymbol}
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
              <span className="font-bold">{selectedAssetSymbol}</span> on{" "}
              <span className="capitalize">{destChain.chainName}</span>. If your
              recipient doesn’t support{" "}
              <span className="font-bold">{selectedAssetSymbol}</span>{" "}
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
