import { useContractEvent } from "wagmi";

import { getDestChainId, useSwapStore } from "../store";
import { SwapStatus } from "../utils/enums";

export function useDetectUnwrapTransfer() {
  const destChainId = useSwapStore(getDestChainId);
  const { asset, destChain, setSwapStatus, intermediaryDepositAddress } =
    useSwapStore();

  useContractEvent({
    chainId: destChainId as number,
    address: ((asset?.chain_aliases?.[destChain?.chainName.toLowerCase()]
      ?.tokenAddress as string) || "0x") as `0x${string}`,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "wad",
            type: "uint256",
          },
        ],
        name: "Withdrawal",
        type: "event",
      },
    ],
    eventName: "Withdrawal",
    listener: (address) => {
      if (asset?.native_chain !== destChain.chainName.toLowerCase()) {
        return;
      }
      if (
        typeof address === "string" &&
        address?.toLowerCase() === intermediaryDepositAddress?.toLowerCase()
      ) {
        setSwapStatus(SwapStatus.FINISHED);
      }
    },
  });
}
