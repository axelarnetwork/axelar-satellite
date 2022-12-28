import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContractRead,
  useContractWrite,
  useSendTransaction,
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
  getSrcTokenAddress,
  getSelectedAssetSymbol,
} from "../../../../store";
import { ENVIRONMENT } from "../../../../config/constants";
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
    setTxInfo,
    txInfo,
  } = useSwapStore((state) => state);
  const srcChainId = useSwapStore(getSrcChainId);
  const destChainId = useSwapStore(getDestChainId);
  const { wagmiConnected } = useWalletStore();

  const { address } = useAccount();

  const { data: accountBalance } = useBalance({
    enabled: !!srcChainId,
    chainId: srcChainId,
    addressOrName: address,
  });
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);

  const { data: tokenAmount } = useContractRead({
    enabled: !!(srcTokenAddress && srcChainId),
    addressOrName: srcTokenAddress as string,
    contractInterface: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address],
  });

  useWaitForTransaction({
    chainId: srcChainId,
    hash: txInfo?.sourceTxHash,
    onSettled(data, error) {
      setNumConfirmationsSoFar(numConfirmationsSoFar + 1);
    },
    confirmations: Math.min(
      numConfirmationsSoFar,
      ENVIRONMENT === "mainnet" &&
        srcChain.chainName.toLowerCase() === "ethereum"
        ? 96
        : (srcChain.confirmLevel as number)
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

  const {
    data: sendNativeDataResult,
    isLoading,
    isSuccess,
    sendTransactionAsync,
  } = useSendTransaction({
    chainId: srcChainId as number,
    request: {
      to: depositAddress,
      value: !!tokensToTransfer
        ? utils?.parseUnits(tokensToTransfer, asset?.decimals)
        : 0,
    },
  });

  useEffect(() => {
    console.log("send native data result", sendNativeDataResult);
    if (!sendNativeDataResult?.hash) return;
    setTxInfo({
      sourceTxHash: sendNativeDataResult?.hash,
      destStartBlockNumber: blockNumber,
    });
    setIsTxOngoing(true);
  }, [sendNativeDataResult]);

  useEffect(() => {
    const assetCommonKey = asset?.common_key[ENVIRONMENT];
    const assetData = srcChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );

    setCurrentAsset(assetData);
    setTokenAddress(assetData?.tokenAddress as string);
  }, [asset]);

  async function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit =
      (await renderGasFee(srcChain, destChain, asset as AssetConfig)) || 0;
    console.log("min Deposit", minDeposit);
    if (new BigNumber(amount || "0").lte(new BigNumber(minDeposit)))
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
    const { minAmountOk, minDeposit } = await checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit} ${
          asset?.chain_aliases[srcChain.chainName.toLowerCase()].assetSymbol
        }`
      );

    // check if user has enough gas
    // const nativeBalance = accountBalance?.value.toString() as string;
    // const minNativeBalance = new BigNumber("0.05")
    //   .times(10 ** Number(accountBalance?.decimals))
    //   .toString();
    // if (!nativeBalance) {
    //   return toast.error(`Could not read native token balance`);
    // }
    // // show error if native token balance is smalled than an arbitrary 0.05
    // if (new BigNumber(nativeBalance).lt(new BigNumber(minNativeBalance))) {
    //   return toast.error(
    //     `Insufficient ${accountBalance?.symbol} amount: ${new BigNumber(
    //       nativeBalance
    //     )
    //       .div(10 ** Number(accountBalance?.decimals))
    //       .toString()} available`
    //   );
    // }
    console.log(1);

    if (ENVIRONMENT === "testnet") {
      console.log(2);
      // WRAP
      if (asset?.native_chain === srcChain.chainIdentifier[ENVIRONMENT]) {
        const tx = await sendTransactionAsync();
        setTxInfo({
          sourceTxHash: tx?.hash,
          destStartBlockNumber: blockNumber,
        });
        return;
      }
    }

    console.log(3);

    // check that the user has enough tokens
    const tokenBalance = tokenAmount?.toString() as string;
    const minTokenBalance = new BigNumber(minDeposit)
      .times(10 ** Number(asset?.decimals))
      .toString();
    if (new BigNumber(tokenBalance).lt(new BigNumber(minTokenBalance))) {
      return toast.error(
        `Insufficient ${selectedAssetSymbol} amount: ${new BigNumber(
          tokenBalance
        )
          .div(10 ** Number(asset?.decimals))
          .toString()} available`
      );
    }

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

  const getStatus = () => {
    if (
      ENVIRONMENT === "mainnet" &&
      srcChain.chainName.toLowerCase() === "ethereum"
    ) {
      return (
        <div className="flex flex-col items-center my-2 gap-x-5">
          <div className="flex items-center w-9/12 gap-x-2">
            {/* <SpinnerRoundFilled
              className="text-blue-500"
              size={20}
              color="#00a6ff"
            /> */}
            <div className="w-full space-x-2">
              <div className="text-sm text-center">
                <div>Waiting for 2 epochs (~64-96 blocks)</div>
              </div>
              <div className="flex justify-center space-x-2 text-sm text-center">
                <div className="text-slate-400">Current height:</div>
                <div className="text-slate-400">
                  {numConfirmationsSoFar > 96 && ">"}
                  {Math.min(numConfirmationsSoFar, 96)} block
                  {numConfirmationsSoFar > 1 && "s"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 gap-x-2">
            <progress
              className="w-56 progress progress-success"
              value={numConfirmationsSoFar}
              max={96}
            ></progress>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center my-2 gap-x-5">
        <div className="flex items-center gap-x-2">
          <SpinnerRoundFilled
            className="text-blue-500"
            size={20}
            color="#00a6ff"
          />
          <span className="text-sm">
            Waiting for{" "}
            {Math.min(numConfirmationsSoFar, srcChain.confirmLevel as number)}/
            {srcChain.confirmLevel} confirmations before forwarding to Axelar...
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
    );
  };

  return (
    <div>
      {isTxOngoing ? (
        getStatus()
      ) : (
        <div>
          <div className="max-w-xs pb-4 mx-auto text-sm divider">OR</div>
          <div className="flex justify-center">
            <button
              className="mb-5 btn btn-primary"
              onClick={handleOnTokensTransfer}
            >
              <span className="mr-2">Send From Metamask</span>
              <div className="flex justify-center my-2 gap-x-5">
                <Image
                  src="/assets/wallets/metamask.logo.svg"
                  height={30}
                  width={30}
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
