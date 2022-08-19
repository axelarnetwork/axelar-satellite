import { formatUnits } from "ethers/lib/utils";
import { ethers } from "ethers"
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { BigNumber } from "bignumber.js";
import { getSrcChainId, getSrcTokenAddress, useSwapStore } from "../store";
import { ENVIRONMENT } from "../config/constants";
import { getAddress, queryBalance } from "../utils/wallet/keplr";
import { getCosmosChains } from "../config/web3";

export const useGetAssetBalance = () => {
  const { address } = useAccount();
  const { asset, allAssets } = useSwapStore((state) => state);

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

  const setKeplrBalance = useCallback(async (): Promise<void> => {
    if (!asset) return;
    if (!srcChain) return;

    const { decimals, common_key } = asset;
    const { chainName } = srcChain;

    const derivedDenom = allAssets.find(
      (assetConfig) =>
        assetConfig.common_key[ENVIRONMENT] === common_key[ENVIRONMENT]
    )?.chain_aliases[chainName.toLowerCase()]?.ibcDenom;
    if (!derivedDenom) throw new Error("asset not found: " + common_key);

    const cosmosChains = getCosmosChains(allAssets);

    const fullChainConfig = cosmosChains.find(
      (chainConfig) =>
        chainConfig.chainIdentifier.toLowerCase() ===
        srcChain.chainName.toLowerCase()
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
      setBalance(balance);
    } catch (e) {
      setBalance("0");
      const msg = `RPC query failure for ${fullChainConfig.chainName}. Please let us know.`;
      toast.error(msg);
      throw new Error(msg);
    }
  }, [asset, srcChain, allAssets]);

  return {
    balance,
    setKeplrBalance,
  };
};
