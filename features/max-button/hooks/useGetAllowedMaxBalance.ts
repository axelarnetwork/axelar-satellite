import { useCallback, useEffect, useState } from "react";

import { getCosmosChains } from "config/web3";
import { CosmosChain } from "config/web3/cosmos/interface";

import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
  useWalletStore,
} from "../../../store";

import { ethers } from "ethers";
import { getAddress, queryBalance } from "utils/wallet/keplr";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useProvider,
} from "wagmi";

import { Hash } from "../../../types";

const { utils } = ethers;
const { formatUnits } = utils;

/**
 * Returns the max balance that a user can select by
 * taking into account the transfer fee.
 */
export function useGetAllowedMaxBalance() {
  const srcChainId = useSwapStore(getSrcChainId);
  const srcChain = useSwapStore((state) => state.srcChain);
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);
  const depositAddress = useSwapStore((state) => state.depositAddress);
  const asset = useSwapStore((state) => state.asset);
  const allAssets = useSwapStore((state) => state.allAssets);

  const wagmiConnected = useWalletStore((state) => state.wagmiConnected);
  const keplrConnected = useWalletStore((state) => state.keplrConnected);

  const { address } = useAccount();
  const { data: balance } = useBalance({
    chainId: srcChainId,
    address,
  });
  const provider = useProvider({
    chainId: srcChainId,
  });

  const { data: tokenBalance } = useContractRead({
    enabled: !asset?.is_gas_token && wagmiConnected,
    address: srcTokenAddress as string,
    abi: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address as Hash],
  });

  const [maxBalance, setMaxBalance] = useState<string>("0");

  const estimateGas = useCallback(async () => {
    return provider
      .estimateGas({
        to: depositAddress,
        value: utils.parseEther("1.0"),
      })
      .then((bigNum) => bigNum.mul(5));
  }, [provider, depositAddress]);

  const computeRealMaxBalance = useCallback(
    async (balance: ethers.BigNumber) => {
      // if erc20 return token balance
      if (!asset?.is_gas_token)
        return formatUnits(tokenBalance || "0", asset?.decimals || 18);

      // if native asset return native token balance minus tx fee
      const gas = await estimateGas();
      const gasPrice = await provider.getGasPrice();
      const fee = gas.mul(gasPrice);
      return formatUnits(balance.sub(fee), asset?.decimals || 18).substring(
        0,
        10
      );
    },
    [provider, asset?.decimals, asset?.is_gas_token, tokenBalance, estimateGas]
  );

  useEffect(() => {
    if (srcChain.module !== "evm") return;
    if (!provider || !balance) return;
    computeRealMaxBalance(balance.value).then((balanceMinusFee) =>
      setMaxBalance(balanceMinusFee)
    );
  }, [provider, balance, computeRealMaxBalance]);

  const getKplrBalance = useCallback(
    async (fullChainConfig: CosmosChain, derivedDenom: string) => {
      const res = await queryBalance(
        await getAddress(fullChainConfig),
        derivedDenom,
        fullChainConfig.rpc
      );
      if (!res?.amount) return;
      setMaxBalance(formatUnits(res.amount, asset?.decimals));
    },
    [asset?.decimals]
  );

  useEffect(() => {
    if (srcChain.module !== "axelarnet" || !keplrConnected) return;

    const cosmosChains = getCosmosChains(allAssets);

    const fullChainConfig = cosmosChains.find(
      (chainConfig) =>
        chainConfig.chainIdentifier?.toLowerCase() ===
        srcChain.chainName?.toLowerCase()
    );
    const derivedDenom =
      asset?.chain_aliases[srcChain.chainName.toLowerCase()].ibcDenom;

    if (!fullChainConfig || !derivedDenom) return;

    getKplrBalance(fullChainConfig, derivedDenom);
  }, [srcChain, getKplrBalance, asset, allAssets, keplrConnected]);

  return maxBalance;
}
