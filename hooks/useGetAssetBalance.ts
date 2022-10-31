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
  WalletStatus,
} from "@terra-money/wallet-provider";
import { Coin, Fee, LCDClient, MsgTransfer } from "@terra-money/terra.js";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { useIsTerraConnected } from "./terra/useIsTerraConnected";
import { NativeAssetConfig } from "../config/web3/evm/native-assets";

export const useGetAssetBalance = () => {
  const { address } = useAccount();
  const { asset, allAssets, allChains, setSrcChain, setDestChain } =
    useSwapStore((state) => state);
  const [loading, setLoading] = useState(false);
  const { keplrConnected, userSelectionForCosmosWallet } = useWalletStore();
  const { status, network, wallets } = useTerraWallet();
  const terraLcdClient = useTerraLCDClient();

  const srcChainId = useSwapStore(getSrcChainId);
  const srcChain = useSwapStore((state) => state?.srcChain);
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);
  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();

  const [balance, setBalance] = useState<string>("0");
  const [keplrBalance, setKeplrStateBalance] = useState<string>("0");
  const [terraStationBalance, setTerraStationBalance] = useState<string | null>(
    "0"
  );
  const [showNativeBalance, setShowNativeBalance] = useState(false);

  const { data, isSuccess } = useContractRead({
    enabled: !!(srcTokenAddress && srcChainId),
    addressOrName: srcTokenAddress as string,
    contractInterface: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: nativeBalanceData,
    isError,
    isLoading,
  } = useBalance({
    enabled: showNativeBalance,
    addressOrName: address,
    chainId: srcChainId,
  });

  // convert fetched token balance to a readable format
  useEffect(() => {
    if (srcChain?.module !== "evm") return;

    setLoading(true);

    const shouldShowNativeBalance = !!(
      srcChainId &&
      (asset as NativeAssetConfig)?.is_native_asset &&
      asset?.native_chain === srcChain.chainName?.toLowerCase()
    );
    setShowNativeBalance(shouldShowNativeBalance);

    if (shouldShowNativeBalance && nativeBalanceData) {
      setBalance(nativeBalanceData.formatted);
      setLoading(false);
      return;
    }

    if (!isSuccess || !data) {
      setBalance("0");
      setLoading(false);
      return;
    }
    const bigNum = new BigNumber(ethers.BigNumber.from(data).toString());
    const num = bigNum.div(10 ** Number(asset?.decimals));

    setBalance(num.toFixed());
    setLoading(false);
  }, [
    srcChainId,
    srcTokenAddress,
    data,
    isSuccess,
    nativeBalanceData,
    setShowNativeBalance,
    asset,
    srcChain,
  ]);

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
