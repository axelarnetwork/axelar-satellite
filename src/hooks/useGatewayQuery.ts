import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

import { getWagmiChains } from "../config/web3";
import gatewayABI from "../data/abi/axelarGateway";
import { useSwapStore } from "../store";
import { useAxelarRPCQuery } from "./api/useAxelarRPCQuery";

export function useGatewayQuery() {
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
      String(
        asset?.chain_aliases[destChain?.chainName?.toLowerCase()].assetSymbol
      ),
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
      const { address } = await api?.evm?.GatewayAddress({ chain });

      setGatewayAddr(address);
    })();
  }, [destChain, api]);

  return maxTransferAmount
    ? formatUnits(maxTransferAmount / BigInt(4), asset?.decimals ?? 0)
    : null;
}
