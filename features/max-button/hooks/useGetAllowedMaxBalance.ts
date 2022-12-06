import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useProvider,
} from "wagmi";
import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
} from "../../../store";
import { Hash } from "../../../types";

const { utils } = ethers;
const { formatUnits } = utils;

/**
 * Returns the max balance that a user can select by
 * taking into account the transfer fee.
 */
export function useGetAllowedMaxBalance() {
  const srcChainId = useSwapStore(getSrcChainId);
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);
  const depositAddress = useSwapStore((state) => state.depositAddress);
  const asset = useSwapStore((state) => state.asset);

  const { address } = useAccount();
  const { data: balance } = useBalance({
    chainId: srcChainId,
    address,
  });
  const provider = useProvider({
    chainId: srcChainId,
  });

  const { data: tokenBalance } = useContractRead({
    enabled: !asset?.is_native_asset,
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
      if (!asset?.is_native_asset)
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
    [
      provider,
      asset?.decimals,
      asset?.is_native_asset,
      tokenBalance,
      estimateGas,
    ]
  );

  useEffect(() => {
    if (!provider || !balance) return;
    computeRealMaxBalance(balance.value).then((balanceMinusFee) =>
      setMaxBalance(balanceMinusFee)
    );
  }, [provider, balance, computeRealMaxBalance]);

  return maxBalance;
}
