import { useContractEvent } from "wagmi";

import { ENVIRONMENT } from "../config/constants";
import { getDestChainId, useSwapStore } from "../store";
import { SwapStatus } from "../utils/enums";

export function useDetectUnwrapTransfer() {
  const destChainId = useSwapStore(getDestChainId);
  const { asset, destChain, setSwapStatus, intermediaryDepositAddress } =
    useSwapStore();

  useContractEvent({
    chainId: destChainId as number,
    address:
      (asset?.chain_aliases?.[destChain?.chainName.toLowerCase()]
        ?.tokenAddress as string) || "0x",
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
    listener: (...event) => {
      if (asset?.native_chain !== destChain.chainName.toLowerCase()) {
        return;
      }
      const address = event[0];
      if (
        address?.toLowerCase() === intermediaryDepositAddress?.toLowerCase()
      ) {
        setSwapStatus(SwapStatus.FINISHED);
      }
    },
  });
}
