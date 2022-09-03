import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useBlockNumber,
  useConnect,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import { utils } from "ethers";
import toast from "react-hot-toast";
import { AssetConfig, AssetInfo } from "@axelar-network/axelarjs-sdk";
import { SpinnerRoundFilled } from "spinners-react";

import { useSwapStore, useWalletStore } from "../../../../store";
import { ENVIRONMENT } from "../../../../config/constants";
import { SwapStatus } from "../../../../utils/enums";
import { useDetectDepositConfirmation } from "../../../../hooks";
import { renderGasFee } from "../../../../utils/renderGasFee";

export const EvmWalletTransfer = () => {
  const { connectAsync, connectors, error } = useConnect();
  const [currentAsset, setCurrentAsset] = useState<AssetInfo>();
  const [tokenAddress, setTokenAddress] = useState<string>("");

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
  } = useSwapStore((state) => state);
  const { wagmiConnected } = useWalletStore();
  const { chains } = useNetwork();

  const srcChainId = chains.find(
    (_chain) => _chain.network === srcChain.chainName.toLowerCase()
  );
  const destChainId = chains.find(
    (chain) => chain.network === destChain.chainName.toLowerCase()
  )?.id;

  const { writeAsync } = useContractWrite({
    chainId: srcChainId?.id, // call transfer on source chain
    addressOrName: tokenAddress,
    contractInterface: erc20ABI,
    functionName: "transfer",
  });

  const { data: blockNumber } = useBlockNumber({
    chainId: destChainId,
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
      <div className="flex justify-center my-2 gap-x-5">
        {isTxOngoing ? (
          <div className="flex items-center gap-x-2">
            <SpinnerRoundFilled
              className="text-blue-500"
              size={20}
              color="#00a6ff"
            />
            <span className="text-sm">
              Waiting for transaction confirmation...
            </span>
          </div>
        ) : (
          <button onClick={handleOnTokensTransfer}>
            <Image
              src="/assets/wallets/metamask.logo.svg"
              height={30}
              width={30}
            />
          </button>
        )}
      </div>
    </div>
  );
};
