import { formatUnits, parseUnits } from "ethers/lib/utils";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, erc20ABI, useBalance } from "wagmi";
import { BigNumber } from "bignumber.js";
import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
  useWalletStore,
} from "../store";
import {
  DEFAULT_DEST_CHAIN,
  DEFAULT_SRC_CHAIN,
  ENVIRONMENT,
} from "../config/constants";
import { getAddress, queryBalance } from "../utils/wallet/keplr";
import { getCosmosChains } from "../config/web3";
import {
  useWallet as useTerraWallet,
  useLCDClient as useTerraLCDClient,
} from "@terra-money/wallet-provider";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { useIsTerraConnected } from "./terra/useIsTerraConnected";
import { Hash } from "../types";

export const useGetAssetBalance = () => {
  const { asset, allAssets, allChains, setSrcChain, srcChain, setDestChain } =
    useSwapStore((state) => state);
  const { keplrConnected, userSelectionForCosmosWallet } = useWalletStore();

  const { status, wallets } = useTerraWallet();
  const terraLcdClient = useTerraLCDClient();
  const { isTerraConnected } = useIsTerraConnected();

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string>("0");
  const [keplrBalance, setKeplrStateBalance] = useState<string>("0");
  const [terraStationBalance, setTerraStationBalance] = useState<string | null>(
    "0"
  );

  const { balance: evmBalance, isLoading: evmIsLoading } = useGetEvmBalance();
  useEffect(() => {
    if (srcChain.module !== "evm") return;
    if (evmBalance) setBalance(evmBalance);
    setLoading(evmIsLoading);
  }, [evmBalance, srcChain.module, evmIsLoading]);

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

  const setKeplrBalance = useCallback(async (): Promise<void> => {
    if (!keplrConnected || !asset || !srcChain) {
      setBalance("0");
      return;
    }

    setLoading(true);

    const { decimals, common_key } = asset;
    const { chainName } = srcChain;

    const derivedDenom = allAssets.find(
      (assetConfig) =>
        assetConfig.common_key[ENVIRONMENT] === common_key[ENVIRONMENT]
    )?.chain_aliases[chainName?.toLowerCase()]?.ibcDenom;
    if (!derivedDenom) {
      const srcChain = allChains.find(
        (chain) => chain.chainName?.toLowerCase() === DEFAULT_SRC_CHAIN
      );
      const destChain = allChains.find(
        (chain) => chain.chainName?.toLowerCase() === DEFAULT_DEST_CHAIN
      );
      setSrcChain(srcChain as ChainInfo);
      setDestChain(destChain as ChainInfo);
      return;
    }

    const cosmosChains = getCosmosChains(allAssets);

    const fullChainConfig = cosmosChains.find(
      (chainConfig) =>
        chainConfig.chainIdentifier?.toLowerCase() ===
        srcChain.chainName?.toLowerCase()
    );
    if (!fullChainConfig)
      throw new Error("chain config not found: " + srcChain.chainName);

    try {
      const res = await queryBalance(
        await getAddress(fullChainConfig),
        derivedDenom,
        fullChainConfig.rpc
      );
      const balance = formatUnits(res?.amount as string, decimals) || "0";
      setKeplrStateBalance(balance);
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
    setLoading(false);
  }, [asset, srcChain, allAssets, keplrConnected]);

  return {
    balance,
    keplrBalance,
    terraStationBalance,
    setKeplrBalance,
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
      asset?.is_native_asset &&
      asset.native_chain === srcChain.chainName?.toLowerCase();
    setIsNativeBalance(!!isNativeAsset);
  }, [srcChain, asset]);

  const updateBalance = useCallback(() => {
    if (isNativeBalance) {
      const value = new BigNumber(nativeBalance?.formatted || "0").toFixed(4);
      return setBalance(value);
    }

    const bigNum = new BigNumber(
      ethers.BigNumber.from(erc20Balance || "0").toString()
    );
    const num = bigNum.div(10 ** Number(asset?.decimals));
    setBalance(num.toFixed(4));
  }, [nativeBalance, erc20Balance, isNativeBalance, asset?.decimals]);

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
    srcChain.module,
  ]);

  return {
    isNativeBalance,
    isLoading: nativeBalanceIsLoading || erc20BalanceIsLoading,
    balance,
  };
};
