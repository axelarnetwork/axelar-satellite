import { useCallback, useEffect, useState } from "react";

import {
  useLCDClient as useTerraLCDClient,
  useWallet as useTerraWallet,
} from "@terra-money/wallet-provider";

import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
  useWalletStore,
} from "../store";

import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import toast from "react-hot-toast";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";

import { getCosmosChains } from "../config/web3";
import { Hash } from "../types";
import { getAddress, queryBalance } from "../utils/wallet/keplr";
import { useIsTerraConnected } from "./terra/useIsTerraConnected";

export const useGetAssetBalance = () => {
  const { asset, srcChain } = useSwapStore((state) => state);
  const { keplrConnected, userSelectionForCosmosWallet } = useWalletStore();

  const { status, wallets } = useTerraWallet();
  const terraLcdClient = useTerraLCDClient();
  const { isTerraConnected } = useIsTerraConnected();

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string>("0");
  // const [keplrBalance, setKeplrStateBalance] = useState<string>("0");
  const [terraStationBalance, setTerraStationBalance] = useState<string | null>(
    "0"
  );

  /**
   * EVM BALANCE LOGIC
   */
  const { balance: evmBalance, isLoading: evmIsLoading } = useGetEvmBalance();
  useEffect(() => {
    if (srcChain.module !== "evm") return;
    if (evmBalance) setBalance(evmBalance);
    setLoading(evmIsLoading);
  }, [evmBalance, srcChain.module, evmIsLoading]);

  /**
   * KEPLR BALANCE LOGIC
   */
  const { balance: keplrBalance, isLoading: keplrBalanceIsLoading } =
    useGetKeplerBalance();
  useEffect(() => {
    if (srcChain.module !== "axelarnet" || !keplrConnected) return;
    if (keplrBalance) setBalance(keplrBalance);
    setLoading(keplrBalanceIsLoading);
  }, [keplrBalance, srcChain.module, keplrBalanceIsLoading]);

  // TODO: put in its own hook & provide tests
  useEffect(() => {
    if (srcChain?.chainName?.toLowerCase() !== "terra") {
      setTerraStationBalance(null);
      return;
    }
    if (!isTerraConnected || !wallets[0]?.terraAddress) return;
    const denom = asset?.chain_aliases["terra"].ibcDenom as string;
    if (!denom) return;

    terraLcdClient.bank
      .balance(wallets[0].terraAddress)
      .then(([coins]) => {
        setTerraStationBalance(
          formatUnits(
            coins.get(denom)?.amount.toNumber() as number,
            asset?.decimals
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

  const [isNativeBalance, setIsNativeBalance] = useState(false);
  const [balance, setBalance] = useState<string>();

  // read native balance
  const {
    data: nativeBalance,
    isFetching: nativeBalanceIsLoading,
    refetch: refetchNativeBalance,
  } = useBalance({
    enabled: srcChain?.module === "evm",
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
    enabled: srcChain?.module === "evm",
    address: srcTokenAddress as string,
    abi: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address as Hash],
  });

  /**
   * DETECT IF A NATIVE ASSET IS SELECTED ON THE SOURCE CHAIN
   */
  useEffect(() => {
    const isNativeAsset =
      asset?.is_gas_token &&
      asset.native_chain === srcChain.chainName?.toLowerCase();
    setIsNativeBalance(!!isNativeAsset);
  }, [srcChain, asset]);

  const updateBalance = useCallback(() => {
    if (isNativeBalance) {
      const value = new BigNumber(nativeBalance?.formatted || "0").toFixed(4);
      return setBalance(value);
    }

    const bigNum = new BigNumber(erc20Balance?._hex || "0");
    const num = bigNum.div(10 ** Number(asset?.decimals));
    setBalance(num.toFixed(4));
  }, [
    isNativeBalance,
    asset?.decimals,
    nativeBalance?.formatted,
    erc20Balance?._hex,
  ]);

  /**
   * UPDATE BALANCE ON EVERY SWAP STATE CHANGE
   */
  useEffect(() => {
    if (srcChain.module !== "evm") return;
    if (isNativeBalance) refetchNativeBalance().then(() => updateBalance());
    if (!isNativeBalance) refetchErc20Balance().then(() => updateBalance());
  }, [
    swapStatus,
    srcChainId,
    isNativeBalance,
    erc20Balance,
    updateBalance,
    refetchNativeBalance,
    refetchErc20Balance,
    srcChain,
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
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const { keplrConnected } = useWalletStore();

  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (srcChain.module !== "axelarnet" || !keplrConnected) return;
    setIsLoading(true);
    updateBalance().finally(() => setIsLoading(false));
  }, [srcChain, swapStatus, asset, keplrConnected]);

  async function updateBalance() {
    const cosmosChains = getCosmosChains(allAssets);

    const derivedDenom =
      asset?.chain_aliases[srcChain.chainName.toLowerCase()].ibcDenom;

    const fullChainConfig = cosmosChains.find(
      (chainConfig) =>
        chainConfig.chainIdentifier?.toLowerCase() ===
        srcChain.chainName?.toLowerCase()
    );

    if (!fullChainConfig || !derivedDenom) return;

    try {
      const res = await queryBalance(
        await getAddress(fullChainConfig),
        derivedDenom,
        fullChainConfig.rpc
      );
      const balance = formatUnits(res?.amount as string, asset.decimals) || "0";
      setBalance(balance);
    } catch (e: any) {
      setBalance("0");
      let msg;
      if (e?.toString()?.includes("Ledger is not compatible")) {
        msg = e?.toString();
      } else {
        msg = `RPC query failure for ${fullChainConfig.chainName}. Please let us know.`;
      }
      toast.error(msg);
    }
  }

  return {
    isLoading,
    balance,
  };
};
