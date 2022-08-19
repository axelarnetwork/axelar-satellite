import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import {
  getSrcChainId,
  getSrcTokenAddress,
  useSwapStore,
  useWalletStore,
} from "../store";
import { ENVIRONMENT } from "../config/constants";
import { getAddress, getSigningClient } from "../utils/wallet/keplr";
import { getCosmosChains } from "../config/web3";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

export const useGetAssetBalance = () => {
  const { address } = useAccount();
  const { asset, allAssets } = useSwapStore((state) => state);
  const isKeplrConnected = useWalletStore((state) => state.keplrConnected);

  const srcChainId = useSwapStore(getSrcChainId);
  const srcChain = useSwapStore((state) => state?.srcChain);
  const srcTokenAddress = useSwapStore(getSrcTokenAddress);

  const [balance, setBalance] = useState<string>("0");

  const { data, isSuccess } = useContractRead({
    enabled: !!(srcTokenAddress && srcChainId),
    addressOrName: srcTokenAddress as string,
    contractInterface: erc20ABI,
    chainId: srcChainId,
    functionName: "balanceOf",
    args: [address],
  });

  // convert fetched token balance to a readable format
  useEffect(() => {
    if (srcChain?.module !== "evm") return;
    if (!isSuccess || !data) {
      setBalance("0");
      return;
    }
    const bigNum = new BigNumber(ethers.BigNumber.from(data).toString());
    const num = bigNum.div(10 ** Number(asset?.decimals));

    setBalance(num.toFixed());
  }, [srcChainId, srcTokenAddress, data, isSuccess]);

  useEffect(() => {
    if (srcChain?.module !== "axelarnet") return;
    if (!isKeplrConnected) return;
    setKeplrBalance().then((balance) => setBalance(balance));
  }, [srcChainId, srcTokenAddress, data, isSuccess]);

  const setKeplrBalance = useCallback(async (): Promise<string> => {
    if (!asset) return "";
    if (!srcChain) return "";

    const { decimals, common_key } = asset;
    const { chainName } = srcChain;

    const derivedDenom = allAssets.find(
      (assetConfig) =>
        assetConfig.common_key[ENVIRONMENT] === common_key[ENVIRONMENT]
    )?.chain_aliases[chainName.toLowerCase()]?.ibcDenom;
    if (!derivedDenom) throw new Error("asset not found: " + common_key);

    const fullChainConfig = getCosmosChains().find(
      (chainConfig) =>
        chainConfig.chainIdentifier.toLowerCase() ===
        srcChain.chainName.toLowerCase()
    );
    if (!fullChainConfig)
      throw new Error("chain config not found: " + srcChain.chainName);

    const cosmjs = await getSigningClient(
      fullChainConfig?.chainId as string,
      fullChainConfig?.rpc as string
    );

    const balanceResponse: Coin = await cosmjs.getBalance(
      await getAddress(fullChainConfig?.chainId as string),
      derivedDenom
    );

    return ethers.utils.formatUnits(balanceResponse.amount, decimals) || "0";
  }, []);

  return {
    balance,
  };
};
