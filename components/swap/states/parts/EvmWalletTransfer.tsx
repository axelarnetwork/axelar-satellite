import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useBlockNumber, useContractWrite, useNetwork } from "wagmi";
import { erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import { utils } from "ethers";
import toast from "react-hot-toast";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { SpinnerRoundOutlined } from "spinners-react";

import { useSwapStore } from "../../../../store";
import { ENVIRONMENT } from "../../../../config/constants";
import { SwapStatus } from "../../../../utils/enums";
import { useDetectDepositConfirmation } from "../../../../hooks";

export const EvmWalletTransfer = () => {
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
    const minDeposit = minAmount || 0;
    if (new BigNumber(amount || "0") < new BigNumber(minDeposit)) return false;
    return true;
  }

  async function handleOnTokensTransfer() {
    // token amount should not be null
    const minAmountOk = checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${currentAsset?.minDepositAmt}`
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
            <SpinnerRoundOutlined
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
