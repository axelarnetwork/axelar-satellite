import { useCallback, useEffect, useState } from "react";
import {
  useLCDClient as useTerraLCDClient,
  useWallet as useTerraWallet,
} from "@terra-money/wallet-provider";
import toast from "react-hot-toast";
import { formatUnits } from "viem";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useQuery,
} from "wagmi";

import { getCosmosChains } from "../config/web3";
import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
  useWalletStore,
} from "../store";
import { Hash } from "../types";
import { getAddress, queryBalance } from "../utils/wallet/keplr";
import { useIsTerraConnected } from "./terra/useIsTerraConnected";

export const useGetAssetBalance = () => {
  const { asset, srcChain } = useSwapStore((state) => state);
  const { keplrConnected, userSelectionForCosmosWallet, wagmiConnected } =
    useWalletStore();

  const { status, wallets } = useTerraWallet();
  const terraLcdClient = useTerraLCDClient();
  const { isTerraConnected } = useIsTerraConnected();

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string>("0");

  const [terraStationBalance, setTerraStationBalance] = useState<string | null>(
    "0"
  );

  /**
   * EVM BALANCE LOGIC
   */
  const { balance: evmBalance, isLoading: evmIsLoading } = useGetEvmBalance();

  useEffect(
    () => {
      if (!wagmiConnected) {
        return;
      }
      if (srcChain.module !== "evm") {
        return;
      }
      if (evmBalance) {
        setBalance(evmBalance);
      }
      setLoading(evmIsLoading);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [evmBalance, srcChain, evmIsLoading]
  );

  /**
   * KEPLR BALANCE LOGIC
   */
  const { data: keplrBalance, isLoading: keplrBalanceIsLoading } =
    useGetKeplerBalance();
  useEffect(
    () => {
      if (srcChain.module !== "axelarnet" || !keplrConnected) {
        return;
      }
      if (keplrBalance) {
        setBalance(keplrBalance);
      }
      setLoading(keplrBalanceIsLoading);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keplrBalance, srcChain.module, keplrBalanceIsLoading]
  );

  // TODO: put in its own hook & provide tests
  useEffect(() => {
    if (srcChain?.chainName?.toLowerCase() !== "terra") {
      setTerraStationBalance(null);
      return;
    }
    if (!(isTerraConnected && wallets[0]?.terraAddress)) {
      return;
    }
    const denom = asset?.chain_aliases["terra"].ibcDenom as string;
    if (!denom) {
      return;
    }

    terraLcdClient.bank
      .balance(wallets[0].terraAddress)
      .then(([coins]) => {
        setTerraStationBalance(
          formatUnits(
            BigInt(coins.get(denom)?.amount.toString() ?? "0"),
            asset?.decimals ?? 0
          )
        );
      })
      .catch(() => setTerraStationBalance(null));
  }, [
    srcChain,
    status,
    asset,
    isTerraConnected,
    userSelectionForCosmosWallet,
    wallets,
    terraLcdClient,
  ]);

  return {
    balance,
    keplrBalance,
    terraStationBalance,
    loading,
  };
};

const useGetEvmBalance = () => {
  const { address } = useAccount();
  const asset = useSwapStore((state) => state.asset);
  const srcChain = useSwapStore((state) => state.srcChain);
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const srcChainId = useSwapStore(getSrcChainId);
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);

  const wagmiConnected = useWalletStore((state) => state.wagmiConnected);

  const [isNativeBalance, setIsNativeBalance] = useState(false);
  const [balance, setBalance] = useState<string>();

  // read native balance
  const {
    data: nativeBalance,
    isFetching: nativeBalanceIsLoading,
    refetch: refetchNativeBalance,
  } = useBalance({
    enabled: srcChain?.module === "evm" && wagmiConnected,
    address: address,
    chainId: srcChainId,
    onError: (error) => {
      console.log(error);
    },
  });

  // read erc20 balance
  const {
    data: erc20Balance,
    isFetching: erc20BalanceIsLoading,
    refetch: refetchErc20Balance,
  } = useContractRead({
    enabled: srcChain?.module === "evm" && wagmiConnected,
    address: srcTokenAddress as `0x${string}`,
    abi: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address as Hash],
  });

  /**
   * DETECT IF A NATIVE ASSET IS SELECTED ON THE SOURCE CHAIN
   */
  useEffect(() => {
    if (!wagmiConnected) {
      return;
    }
    const isNativeAsset =
      asset?.is_gas_token &&
      asset.native_chain === srcChain.chainName?.toLowerCase();
    setIsNativeBalance(!!isNativeAsset);
  }, [srcChain, asset, wagmiConnected]);

  const updateBalance = useCallback(() => {
    if (!wagmiConnected) {
      return;
    }

    if (isNativeBalance) {
      const value = BigInt(nativeBalance?.formatted || "0").toLocaleString(
        "en",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        }
      );
      return setBalance(value);
    }

    const num =
      (erc20Balance ?? BigInt(0)) / BigInt(10 ** (asset?.decimals ?? 0));
    setBalance(
      num.toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      })
    );
  }, [
    isNativeBalance,
    asset?.decimals,
    nativeBalance?.formatted,
    erc20Balance,
    wagmiConnected,
  ]);

  /**
   * UPDATE BALANCE ON EVERY SWAP STATE CHANGE
   */
  useEffect(() => {
    if (srcChain.module !== "evm") {
      return;
    }
    if (!wagmiConnected) {
      return;
    }
    if (isNativeBalance) {
      refetchNativeBalance().then(() => updateBalance());
    }
    if (!isNativeBalance) {
      refetchErc20Balance().then(() => updateBalance());
    }
  }, [
    swapStatus,
    srcChainId,
    isNativeBalance,
    erc20Balance,
    updateBalance,
    refetchNativeBalance,
    refetchErc20Balance,
    srcChain,
    wagmiConnected,
  ]);

  return {
    isNativeBalance,
    isLoading: nativeBalanceIsLoading || erc20BalanceIsLoading,
    balance,
  };
};

/**
 * TODO: should abstract cosmos hooks into a single lib that can switch between several wallets. eg: what wagmi does for evm
 */
const useGetKeplerBalance = () => {
  const asset = useSwapStore((state) => state.asset);
  const allAssets = useSwapStore((state) => state.allAssets);
  const srcChain = useSwapStore((state) => state.srcChain);

  async function updateBalance() {
    const cosmosChains = getCosmosChains(allAssets);

    const derivedDenom =
      asset?.chain_aliases[srcChain.chainName.toLowerCase()]?.ibcDenom;

    const fullChainConfig = cosmosChains.find(
      (chainConfig) =>
        chainConfig.chainIdentifier?.toLowerCase() ===
        srcChain.chainName?.toLowerCase()
    );

    if (!(fullChainConfig && derivedDenom)) {
      return "0";
    }

    try {
      console.log("querying balance", asset.id, srcChain.id);
      const res = await queryBalance(
        await getAddress(fullChainConfig),
        derivedDenom,
        fullChainConfig.rpc
      );
      return res ? formatUnits(BigInt(res.amount), asset.decimals) : "0";
    } catch (e) {
      let msg;
      if (e?.toString()?.includes("Ledger is not compatible")) {
        msg = e?.toString();
      } else {
        msg = `RPC query failure for ${fullChainConfig.chainName}. Please let us know.`;
      }
      toast.error(msg);
      return "0";
    }
  }

  return useQuery(["keplr-balance", asset?.id, srcChain.id], updateBalance, {
    cacheTime: 10_000,
    staleTime: 10_000,
  });
};
