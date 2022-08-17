import { FC, useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { tokenContractDocs } from "../../config/constants";
import { useGetAssetBalance } from "../../hooks";
import { useSwapStore } from "../../store";
import { SwapStatus } from "../../utils/enums";
import { truncateEthAddress } from "../../utils/truncateEthAddress";

export const EvmAssetWarningModal = () => {
  const { asset, destChain, resetState, srcChain, swapStatus } = useSwapStore(
    (state) => state
  );
  const { balance } = useGetAssetBalance();
  const { address } = useAccount();

  const [showAssetWarning, setShowAssetWarning] = useState(false);
  const [userAcknowledged, setUserAcknowledged] = useState(false);

  useEffect(() => {
    if (swapStatus !== SwapStatus.WAIT_FOR_DEPOSIT) {
      userAcknowledged && setUserAcknowledged(false);
      return;
    }
    if (userAcknowledged) return;
    if (!srcChain || !destChain) return;
    if (![srcChain?.module, destChain?.module].includes("evm")) return;
    setShowAssetWarning(true);
  }, [setShowAssetWarning, userAcknowledged, swapStatus]);

  const onConfirm = useCallback(() => {
    setUserAcknowledged(true);
    setShowAssetWarning(false);
  }, [setShowAssetWarning, setUserAcknowledged]);

  return (
    <div className={`modal modal-${showAssetWarning ? "open" : "close"}`}>
      <div className="modal-box">
        {srcChain?.module === "evm" && (
          <div>
            <div>
              {" "}
              Only send{" "}
              <span className="font-bold">
                {
                  asset?.chain_aliases[srcChain.chainName.toLowerCase()]
                    .assetName
                }
              </span>{" "}
              to this deposit address on{" "}
              <span className="capitalize">{srcChain.chainName}</span>. Any
              other tokens sent to this address will be lost.
            </div>

            <div className="mt-2">
              <div className="w-auto text-[#86d6ff]">
                {
                  asset?.chain_aliases[srcChain.chainName.toLowerCase()]
                    .assetName
                }{" "}
                contract address on{" "}
                <span className="capitalize text-[#86d6ff]">
                  {srcChain.chainName}
                </span>
                :{" "}
                {truncateEthAddress(
                  asset?.chain_aliases[srcChain.chainName.toLowerCase()]
                    .tokenAddress as string
                )}
              </div>
            </div>

            {address && balance && (
              <div>
                <span className="w-auto text-[#86d6ff]">
                  Your balance ({truncateEthAddress(address)}): {balance}{" "}
                  {
                    asset?.chain_aliases[srcChain.chainName.toLowerCase()]
                      .assetName
                  }
                </span>
              </div>
            )}
          </div>
        )}

        {destChain?.module === "evm" && (
          <div className="mt-5">
            <span>
              The recipient will receive{" "}
              <span className="font-bold">
                {
                  asset?.chain_aliases[destChain.chainName.toLowerCase()]
                    .assetName
                }
              </span>{" "}
              on <span className="capitalize">{destChain.chainName}</span>. If
              your recipient doesn’t support{" "}
              <span className="font-bold">
                {
                  asset?.chain_aliases[destChain.chainName.toLowerCase()]
                    .assetName
                }
              </span>
              , the funds will be lost.
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

        <div className="flex justify-center mt-5">
          {" "}
          <button className="mx-5 btn" onClick={resetState}>
            Go Back
          </button>
          <button className="btn" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
