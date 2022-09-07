import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useBlockNumber,
  useConnect,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import { utils } from "ethers";
import toast from "react-hot-toast";
import { AssetConfig, AssetInfo } from "@axelar-network/axelarjs-sdk";
import { SpinnerRoundFilled } from "spinners-react";

import {
  getDestChainId,
  getSrcChainId,
  useSwapStore,
  useWalletStore,
} from "../../../../store";
import { ENVIRONMENT } from "../../../../config/constants";
import { SwapStatus } from "../../../../utils/enums";
import { useDetectDepositConfirmation } from "../../../../hooks";
import { renderGasFee } from "../../../../utils/renderGasFee";

export const EvmWalletTransfer = () => {
  const { connectAsync, connectors, error } = useConnect();
  const [currentAsset, setCurrentAsset] = useState<AssetInfo>();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [numConfirmationsSoFar, setNumConfirmationsSoFar] = useState(1);

  // used to hide wallets when transaction has been triggered
  const [isTxOngoing, setIsTxOngoing] = useState(false);

  const {
    srcChain,
    destChain,
    asset,
    depositAddress,
    tokensToTransfer,
    setSwapStatus,
    setTxInfo,
    txInfo,
  } = useSwapStore((state) => state);
  const srcChainId = useSwapStore(getSrcChainId);
  const destChainId = useSwapStore(getDestChainId);
  const { wagmiConnected } = useWalletStore();

  useWaitForTransaction({
    chainId: srcChainId,
    hash: txInfo?.sourceTxHash,
    onSettled(data, error) {
      setNumConfirmationsSoFar(numConfirmationsSoFar + 1);
    },
    confirmations: Math.min(
      numConfirmationsSoFar,
      srcChain.confirmLevel as number
    ),
    enabled: !!(txInfo && txInfo.sourceTxHash),
  });

  const { writeAsync } = useContractWrite({
    chainId: srcChainId, // call transfer on source chain
    addressOrName: tokenAddress,
    contractInterface: erc20ABI,
    functionName: "transfer",
  });

  const { data: blockNumber } = useBlockNumber({
    chainId: destChainId as number,
    enabled: !!destChainId,
  });

  useEffect(() => {
    const assetCommonKey = asset?.common_key[ENVIRONMENT];
    const assetData = srcChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );

    setCurrentAsset(assetData);
    setTokenAddress(assetData?.tokenAddress as string);
  }, [asset]);

  function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit =
      renderGasFee(srcChain, destChain, asset as AssetConfig) || 0;
    console.log("min Deposit", minDeposit);
    if (new BigNumber(amount || "0") <= new BigNumber(minDeposit))
      return { minDeposit, minAmountOk: false };
    return {
      minDeposit,
      minAmountOk: true,
    };
  }

  async function handleOnMetamaskSwitch() {
    const connector = connectors.find((c) => c.name === "MetaMask");
    return connectAsync({ connector });
  }

  async function handleOnTokensTransfer() {
    if (!wagmiConnected) await handleOnMetamaskSwitch();
    // token amount should not be null
    const { minAmountOk, minDeposit } = checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit} ${
          asset?.chain_aliases[srcChain.chainName.toLowerCase()].assetSymbol
        }`
      );

    await writeAsync({
      args: [
        depositAddress,
        utils.parseUnits(tokensToTransfer, asset?.decimals),
      ],
    })
      .then((data) => {
        setTxInfo({
          sourceTxHash: data.hash,
          destStartBlockNumber: blockNumber,
        });
        setIsTxOngoing(true);
        // setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
      })
      .catch((error) => toast.error(error?.message as string));
  }

  return (
    <div>
      {isTxOngoing ? (
        <div className="flex flex-col items-center my-2 gap-x-5">
          {" "}
          <div className="flex items-center gap-x-2">
            <SpinnerRoundFilled
              className="text-blue-500"
              size={20}
              color="#00a6ff"
            />
            <span className="text-sm">
              Waiting for{" "}
              {Math.min(numConfirmationsSoFar, srcChain.confirmLevel as number)}
              /{srcChain.confirmLevel} confirmations before forwarding to
              Axelar...
            </span>
          </div>
          <div className="flex items-center mt-2 gap-x-2">
            <progress
              className="w-56 progress progress-success"
              value={numConfirmationsSoFar}
              max={srcChain.confirmLevel}
            ></progress>
          </div>
        </div>
      ) : (
        <button
        className="w-full mb-5 btn btn-accent btn-outline"
          onClick={handleOnTokensTransfer}
        >
          <span className="mr-2">OR SEND HERE FROM METAMASK</span>
          <div className="flex justify-center my-2 gap-x-5">
            <Image
              src="/assets/wallets/metamask.logo.svg"
              height={30}
              width={30}
            />
          </div>
        </button>
      )}
    </div>
  );
};
