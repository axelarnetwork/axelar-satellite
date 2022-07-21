import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useContractWrite } from "wagmi";
import { erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import { utils } from "ethers";
import toast from "react-hot-toast";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "../../../../store";
import { ENVIRONMENT } from "../../../../config/constants";
import { SwapStatus } from "../../../../utils/enums";

export const EvmWalletTransfer = () => {
  const [currentAsset, setCurrentAsset] = useState<AssetInfo>();
  const [tokenAddress, setTokenAddress] = useState<string>("");

  const {
    srcChain,
    asset,
    depositAddress,
    tokensToTransfer,
    setSwapStatus,
    setTxInfo,
  } = useSwapStore((state) => state);

  const { writeAsync } = useContractWrite({
    addressOrName: tokenAddress,
    contractInterface: erc20ABI,
    functionName: "transfer",
  });

  useEffect(() => {
    const assetCommonKey = asset?.common_key[ENVIRONMENT];
    const assetData = srcChain.chainInfo.assets?.find(
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
        });
        setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
      })
      .catch((error) => toast.error(error?.message as string));
  }

  return (
    <div>
      <div className="flex justify-center my-2 gap-x-5">
        <button onClick={handleOnTokensTransfer}>
          <Image
            src="/assets/wallets/metamask.logo.svg"
            height={20}
            width={20}
          />
        </button>
      </div>
    </div>
  );
};
