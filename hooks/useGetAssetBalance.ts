import { AssetConfig, Chain } from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import { getSrcChainId, getSrcTokenAddress, useSwapStore } from "../store";

export const useGetAssetBalance = () => {
  const { address } = useAccount();
  const { asset } = useSwapStore((state) => state);

  const srcChainId = useSwapStore(getSrcChainId);
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);

  const [balance, setBalance] = useState<string>("0");

  const { data, isSuccess } = useContractRead({
    enabled: !!(srcTokenAddress && srcChainId),
    addressOrName: srcTokenAddress as string,
    contractInterface: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address],
  });

  // convert fetched token balance to a readable format
  useEffect(() => {
    if (!isSuccess || !data) {
      setBalance("0");
      return;
    }
    const bigNum = new BigNumber(ethers.BigNumber.from(data).toString());
    const num = bigNum.div(10 ** Number(asset?.decimals));

    setBalance(num.toFixed());
  }, [srcChainId, srcTokenAddress, data, isSuccess]);

  return {
    balance,
  };
};
