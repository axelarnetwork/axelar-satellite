import { useQuery } from "react-query";
import { Address, formatUnits, parseEther } from "viem";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useFeeData,
  useNetwork,
  usePublicClient,
} from "wagmi";

import { getCosmosChains } from "~/config/web3";

import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
  useWalletStore,
} from "~/store";

import { getAddress, queryBalance } from "~/utils/wallet/keplr";

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
  const provider = usePublicClient({
    chainId: srcChainId,
  });

  const { data: tokenBalance } = useContractRead({
    enabled: !asset?.is_gas_token && wagmiConnected,
    address: srcTokenAddress as `0x${string}`,
    abi: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address as Address],
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
    return formatUnits(BigInt(res.amount), asset.decimals);
  };

  const { data: feeData } = useFeeData();

  const estimateGas = async () => {
    let gas = BigInt(200_000); // filler default value, arbitrarily
    try {
      return provider
        .estimateGas({
          account: address as Address,
          to: depositAddress,
          value: parseEther("1.0"),
        })
        .then((bigNum) => bigNum * BigInt(5));
    } catch (e) {}

    //in some cases, the above calculation does not work, so invoking maxPriorityFeePerGas instead
    try {
      return feeData?.maxPriorityFeePerGas ?? gas;
    } catch (e) {}

    return gas;
  };

  const computeRealMaxBalance = async (balance: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  }) => {
    // if erc20 return token balance
    if (!asset?.is_gas_token) {
      return formatUnits(BigInt(tokenBalance || "0"), asset?.decimals || 18);
    }
    // if native asset return native token balance minus tx fee
    let gas = BigInt(0);
    let gasPrice = BigInt(0);

    try {
      gas = await estimateGas();
      gasPrice = await provider.getGasPrice();
    } catch (e) {
      console.warn(
        "computeRealMaxBalance(): could not estimate gas for max calculation"
      );
    }
    const fee = gas * gasPrice;
    return formatUnits(balance.value - fee, asset?.decimals || 18).substring(
      0,
      10
    );
  };

  const { chain } = useNetwork();

  return useQuery(
    [
      "max-balance",
      chain?.id,
      balance?.value?.toString(),
      asset?.id,
      asset?.is_gas_token,
      tokenBalance?.toString(),
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
