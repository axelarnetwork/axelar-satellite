import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { erc20ABI } from "wagmi";
import { utils } from "ethers";
import { BigNumber } from "bignumber.js";
import toast from "react-hot-toast";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { SpinnerRoundFilled } from "spinners-react";
import cn from "classnames";
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
import { NativeAssetConfig } from "../../../../config/web3/evm/native-assets";
import { Hash } from "../../../../types";

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
    shouldUnwrapAsset,
  } = useSwapStore((state) => state);
  const srcChainId = useSwapStore(getSrcChainId);
  const destChainId = useSwapStore(getDestChainId);
  const { wagmiConnected } = useWalletStore();

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: srcChainId,
  });
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);

  const { data: tokenAmount } = useContractRead({
    enabled: !!(srcTokenAddress && srcChainId) && !!srcTokenAddress,
    address: srcTokenAddress as string,
    abi: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address as Hash],
  });

  useWaitForTransaction({
    chainId: srcChainId,
    hash: txInfo?.sourceTxHash as Hash,
    onSettled(data, error) {
      setNumConfirmationsSoFar(numConfirmationsSoFar + 1);
    },
    confirmations: Math.min(
      numConfirmationsSoFar,
      ENVIRONMENT === "mainnet" &&
        srcChain.chainName?.toLowerCase() === "ethereum"
        ? 96
        : (srcChain.confirmLevel as number)
    ),
    enabled: !!(txInfo && txInfo.sourceTxHash),
  });

  /**
   * SEND TX FOR TOKENS
   */
  const { config: contractWriteConfig } = usePrepareContractWrite({
    enabled:
      chain?.id === srcChainId &&
      !!tokenAddress &&
      !!tokensToTransfer &&
      !asset?.is_native_asset,
    chainId: srcChainId, // call transfer on source chain
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "transfer",
    args: [
      depositAddress as Hash,
      utils.parseUnits(
        !!tokensToTransfer ? tokensToTransfer : "0",
        asset?.decimals
      ),
    ],
    onError(err: any) {
      toast.error(
        `Can't estimate gas limit for transaction. Please verify that you are not trying to transfer more assets than what you have. Transaction might fail if you proceed.`
      );
    },
  });
  const { writeAsync, isLoading: contractWriteIsLoading } =
    useContractWrite(contractWriteConfig);

  const { data: blockNumber } = useBlockNumber({
    chainId: destChainId as number,
    enabled: !!destChainId,
  });

  /**
   * SEND TX FOR NATIVE ASSET
   */
  const { config: sendTxConfig } = usePrepareSendTransaction({
    enabled:
      chain?.id === srcChainId && !!tokensToTransfer && asset?.is_native_asset,
    chainId: srcChainId as number,
    request: {
      to: depositAddress,
      value: utils.parseUnits(
        !!tokensToTransfer ? tokensToTransfer : "0",
        asset?.decimals
      ),
    },
    onError(err: any) {
      toast.error(
        `Can't estimate gas limit for transaction. Please verify that you are not trying to transfer more native assets than what you have. Transaction might fail if you proceed.`
      );
    },
  });
  const {
    data: sendNativeDataResult,
    sendTransactionAsync,
    isLoading: sendTxIsLoading,
  } = useSendTransaction(sendTxConfig);

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

  function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit =
      renderGasFee(srcChain, destChain, asset as NativeAssetConfig) || 0;
    console.log("min Deposit", minDeposit);
    if (new BigNumber(amount || 0).lte(new BigNumber(minDeposit)))
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
    await switchNetworkAsync?.();
    // token amount should not be null
    const { minAmountOk, minDeposit } = checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit} ${
          asset?.chain_aliases[srcChain.chainName?.toLowerCase()].assetSymbol
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

    if (ENVIRONMENT === "testnet") {
      // WRAP
      if (
        asset?.native_chain === srcChain.chainIdentifier[ENVIRONMENT] &&
        asset.is_native_asset
      ) {
        return sendTransactionAsync?.()
          .then((tx) => {
            setTxInfo({
              sourceTxHash: tx?.hash,
              destStartBlockNumber: blockNumber,
            });
          })
          .catch((error) => toast.error(error.reason));
      }
    }

    // check that the user has enough tokens
    const tokenBalance = tokenAmount?.toString() as string;
    const minTokenBalance = new BigNumber(minDeposit)
      .times(10 ** (asset?.decimals || 0))
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

    writeAsync?.()
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
      srcChain.chainName?.toLowerCase() === "ethereum"
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
              className={cn("mb-5 btn", {
                loading: sendTxIsLoading || contractWriteIsLoading,
                "btn-primary": chain?.id === srcChainId,
                "btn-outline": chain?.id !== srcChainId,
              })}
              onClick={handleOnTokensTransfer}
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
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
