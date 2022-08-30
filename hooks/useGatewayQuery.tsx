import { useContractRead } from "wagmi";
import gatewayABI from "../data/abi/axelarGateway.json";
import { useSwapStore } from "../store";
import { formatUnits } from "ethers/lib/utils";

const UseGatewayQuery = (props: any) => {
  const { asset, srcChain } = useSwapStore((state) => state);

  const { data: maxTransferAmount, error } = useContractRead({
    addressOrName: props.gatewayAddr,
    chainId: 43113,
    contractInterface: gatewayABI,
    functionName: "tokenMintLimit",
    enabled: props.gatewayAddr && asset && srcChain,
    args: [asset?.chain_aliases[srcChain?.chainName.toLowerCase()].assetSymbol],
  });

  return (
    maxTransferAmount && (
      <div>
        {formatUnits(
          maxTransferAmount,
          asset?.chain_aliases[srcChain?.chainName.toLowerCase()]?.decimals
        )}
      </div>
    )
  );
};
export default UseGatewayQuery;
