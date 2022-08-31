import { useContractRead } from "wagmi";
import gatewayABI from "../data/abi/axelarGateway.json";
import { useSwapStore } from "../store";
import { commify, formatUnits } from "ethers/lib/utils";
import { useAxelarRPCQuery } from "./api/useAxelarRPCQuery";
import { useEffect, useState } from "react";
import { getWagmiChains } from "../config/web3";
import { BigNumber } from "ethers";

const UseGatewayQuery = () => {
  const { asset, destChain } = useSwapStore((state) => state);
  const [gatewayAddr, setGatewayAddr] = useState<string>("");
  const { api } = useAxelarRPCQuery();

  const { data: maxTransferAmount, error } = useContractRead({
    addressOrName: gatewayAddr,
    chainId: getWagmiChains().find(
      (chain) => chain.networkNameOverride === destChain.chainName.toLowerCase()
    )?.id,
    contractInterface: gatewayABI,
    functionName: "tokenMintLimit",
    enabled: !!(gatewayAddr && asset && destChain && api),
    args: asset?.chain_aliases[destChain?.chainName.toLowerCase()].assetSymbol,
  });

  useEffect(() => {
    (async () => {
      if (!api) return;
      const chain = destChain?.chainName.toLowerCase();
      const gatewayAddress = await (
        await api?.evm?.GatewayAddress({ chain })
      ).address;
      setGatewayAddr(gatewayAddress);
    })();
  }, [destChain, api]);

  return maxTransferAmount && +maxTransferAmount > 0 ? (
    <div>
      {commify(
        formatUnits(BigNumber.from(maxTransferAmount).div(4), asset?.decimals)
      )}{" "}
      {asset?.chain_aliases[destChain?.chainName.toLowerCase()].assetSymbol}
    </div>
  ) : null;
};
export default UseGatewayQuery;
