import { AssetConfig, Chain } from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import { getWagmiChains } from "../config/web3";
import { useSwapStore } from "../store";

export const useGetAssetBalance = () => {
  const { address } = useAccount();
  const { asset, srcChain } = useSwapStore((state) => state);

  const [contractAddress, setContractAddress] = useState<string>();
  const [networkId, setNetworkId] = useState<number>();

  const [balance, setBalance] = useState<string>("0");

  const { data, isSuccess } = useContractRead({
    enabled: !!(contractAddress && networkId),
    addressOrName: contractAddress as string,
    contractInterface: erc20ABI,
    chainId: networkId,
    functionName: "balanceOf",
    args: [address],
  });

  // convert fetched token balance to a readable format
  useEffect(() => {
    if (!isSuccess || !data) return;
    const bigNum = new BigNumber(ethers.BigNumber.from(data).toString());
    const num = bigNum.div(10 ** Number(asset?.decimals));

    setBalance(num.toFixed());
  }, [data, isSuccess]);

  // parse information to allow to fetch contract balance
  useEffect(() => {
    // get contract and network id of the chain we want to call
    if (!srcChain || !asset) return;
    const _contractAddress = getTokenAddress(srcChain, asset);
    const _networkId = getNetworkId(srcChain);

    // update state
    if (!_contractAddress || !_networkId) return;
    setContractAddress(_contractAddress);
    setNetworkId(_networkId);

    // verify balance of account
  }, [srcChain, asset]);

  // extract token address from source chain
  function getTokenAddress(srcChain: Chain, asset: AssetConfig): string | null {
    const chainAlias = srcChain?.chainInfo?.chainName?.toLowerCase();
    const tokenAddress = asset.chain_aliases[chainAlias]?.tokenAddress;
    return tokenAddress || null;
  }

  // extract network id from source chain
  function getNetworkId(srcChain: Chain): number | null {
    const chainAlias = srcChain.chainInfo?.chainName?.toLowerCase();
    if (!chainAlias) return null;

    const wagmiChains = getWagmiChains();
    const chain = wagmiChains.find((_chain) => _chain.network === chainAlias);

    return chain?.id || null;
  }

  return {
    balance,
  };
};
