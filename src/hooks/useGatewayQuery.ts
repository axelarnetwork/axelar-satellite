import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useContractRead } from "wagmi";

import { getWagmiChains } from "../config/web3";
import gatewayABI from "../data/abi/axelarGateway.json";
import { useSwapStore } from "../store";
import { useAxelarRPCQuery } from "./api/useAxelarRPCQuery";

export const useGatewayQuery = () => {
  const { asset, destChain } = useSwapStore((state) => state);
  const [gatewayAddr, setGatewayAddr] = useState<string>("");
  const { api } = useAxelarRPCQuery();

  const { data: maxTransferAmount } = useContractRead({
    address: gatewayAddr as `0x${string}`,
    chainId: getWagmiChains().find(
      (chain) =>
        chain.networkNameOverride === destChain.chainName?.toLowerCase()
    )?.id,
    abi: gatewayABI,
    functionName: "tokenMintLimit",
    enabled: !!(
      gatewayAddr &&
      asset &&
      destChain &&
      api &&
      destChain.module === "evm"
    ),
    args: [
      asset?.chain_aliases[destChain?.chainName?.toLowerCase()].assetSymbol,
    ],
  });

  useEffect(() => {
    (async () => {
      if (!api) {
        return;
      }
      if (destChain.module !== "evm") {
        return;
      }
      const chain = destChain?.chainName?.toLowerCase();
      const gatewayAddress = await (
        await api?.evm?.GatewayAddress({ chain })
      ).address;
      setGatewayAddr(gatewayAddress);
    })();
  }, [destChain, api]);

  return maxTransferAmount
    ? formatUnits(BigNumber.from(maxTransferAmount).div(4), asset?.decimals)
    : null;
};
