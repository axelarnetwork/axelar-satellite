import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useProvider,
} from "wagmi";

import { getCosmosChains } from "~/config/web3";

import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
  useWalletStore,
} from "~/store";

import { Hash } from "~/types";
import { getAddress, queryBalance } from "~/utils/wallet/keplr";

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
    address: srcTokenAddress as `0x${string}`,
    abi: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address as Hash],
  });

  const getKeplrBalance = async () => {
    if (srcChain.module !== "axelarnet" || !keplrConnected) {
      return;
    }

    const fullChainConfig = getCosmosChains(allAssets).find(
      (chainConfig) =>
        chainConfig.chainIdentifier?.toLowerCase() ===
        srcChain.chainName?.toLowerCase()
    );
    const derivedDenom =
      asset?.chain_aliases[srcChain.chainName.toLowerCase()]?.ibcDenom;

    if (!(fullChainConfig && derivedDenom)) {
      return;
    }

    const res = await queryBalance(
      await getAddress(fullChainConfig),
      derivedDenom,
      fullChainConfig.rpc
    );
    if (!res?.amount) {
      return;
    }
    return formatUnits(res.amount, asset?.decimals);
  };

  const estimateGas = async () => {
    let gas = BigNumber.from(200_000); // filler default value, arbitrarily
    try {
      return provider
        .estimateGas({
          to: depositAddress,
          value: utils.parseEther("1.0"),
        })
        .then((bigNum) => bigNum.mul(5));
    } catch (e) {}

    //in some cases, the above calculation does not work, so invoking maxPriorityFeePerGas instead
    try {
      return provider
        .getFeeData()
        .then((feeData) => feeData.maxPriorityFeePerGas ?? gas);
    } catch (e) {}

    return gas;
  };

  const computeRealMaxBalance = async (balance: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: BigNumber;
  }) => {
    // if erc20 return token balance
    if (!asset?.is_gas_token) {
      return formatUnits(tokenBalance || "0", asset?.decimals || 18);
    }
    // if native asset return native token balance minus tx fee
    let gas = BigNumber.from(0),
      gasPrice = BigNumber.from(0);
    try {
      gas = await estimateGas();
      gasPrice = await provider.getGasPrice();
    } catch (e) {
      console.warn(
        "computeRealMaxBalance(): could not estimate gas for max calculation"
      );
    }
    const fee = gas.mul(gasPrice);
    return formatUnits(balance.value.sub(fee), asset?.decimals || 18).substring(
      0,
      10
    );
  };

  return useQuery(
    [
      "max-balance",
      provider.network.chainId,
      balance,
      asset?.id,
      asset?.is_gas_token,
      tokenBalance,
      depositAddress,
      srcChain.id,
      keplrConnected,
    ],
    () => {
      if (srcChain.module === "evm" && provider && balance && asset) {
        return computeRealMaxBalance(balance as any); //TODO
      }
      if (srcChain.module === "axelarnet") {
        return getKeplrBalance();
      }
      return "0";
    }
  );
}
