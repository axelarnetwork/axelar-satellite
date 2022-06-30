import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "wagmi";
import { erc20ABI } from "wagmi";
import { useSwapStore } from "../store";
import { SwapStatus } from "../utils/enums";

export const useListenForEvmTransfer = () => {
  const { swapStatus, asset, srcChain } = useSwapStore((state) => state);

  const [contractAddress, setContractAddress] = useState<string>();

  const { data, isError, isLoading, error } = useContractRead({
    enabled: contractAddress ? true : false,
    addressOrName: contractAddress as string,
    contractInterface: erc20ABI,
    functionName: "balanceOf",
    args: ["0xA57ADCE1d2fE72949E4308867D894CD7E7DE0ef2"],
    chainId: 43113,
  });

  // console.log({
  //   contractAddress,
  //   data,
  //   isError,
  //   error,
  //   isLoading,
  // });

  useEffect(() => {
    if (!srcChain || !asset) return;
    const chainAlias = srcChain?.chainInfo?.chainName?.toLowerCase();
    const tokenAddress = asset.chain_aliases[chainAlias]?.tokenAddress;
    setContractAddress(tokenAddress);
  }, [srcChain, asset]);

  // if (!asset || swapStatus !== SwapStatus.IDLE) return null;

  // console.log({
  //   chainAlias,
  //   tokenAddress,
  // });

  // get token address

  // console.log({
  //   tokenAddress,
  //   chainAlias,
  //   contract: contract.
  // });

  // return null;
};
