import { FC, useCallback, useEffect, useState } from "react";
import { tokenContractDocs } from "../../config/constants";
import { useSwapStore } from "../../store";

export const EvmAssetWarning: FC = () => {
  const {
    asset,
    destChain,
    resetState,
    srcChain,
  } = useSwapStore((state) => state);

  const [showAssetWarning, setShowAssetWarning] = useState(false);
  const [userAcknowledged, setUserAcknowledged] = useState(false);

  useEffect(() => {
    if (userAcknowledged) return;
    if (![srcChain?.module, destChain?.module].includes("evm")) return;

    if (srcChain?.module === "evm") {
      setShowAssetWarning(true);
    }
  }, [destChain, setShowAssetWarning, srcChain, userAcknowledged]);

  const onConfirm = useCallback(() => {
    setUserAcknowledged(true);
    setShowAssetWarning(false);
  }, [setShowAssetWarning, setUserAcknowledged]);

  return (
    <div className={`modal modal-${showAssetWarning ? "open" : "close"}`}>
      <div className="modal-box">
        {srcChain?.module === "evm" && (
          <div>
            {" "}
            Only send{" "}
            <span className="font-bold">
              {asset?.chain_aliases[srcChain.chainName.toLowerCase()].assetName}
            </span>{" "}
            to this deposit address on{" "}
            <span className="capitalize">{srcChain.chainName}</span>. Any other
            tokens sent to this address will be lost.
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
          The correct ERC20 token addresses can be verified{" "}
          <a
            href={
              tokenContractDocs[process.env.NEXT_PUBLIC_ENVIRONMENT as string]
            }
            className="link link-primary"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            here
          </a>.
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
