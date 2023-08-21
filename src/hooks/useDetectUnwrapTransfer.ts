import { zeroAddress } from "viem";
import { Address, useContractEvent } from "wagmi";

import { getDestChainId, useSwapStore } from "../store";
import { SwapStatus } from "../utils/enums";

export function useDetectUnwrapTransfer() {
  const destChainId = useSwapStore(getDestChainId);
  const { asset, destChain, setSwapStatus, intermediaryDepositAddress } =
    useSwapStore();

  const assetAlias = asset?.chain_aliases?.[destChain?.chainName.toLowerCase()];

  const tokenAddress = (assetAlias?.tokenAddress ?? zeroAddress) as Address;

  useContractEvent({
    chainId: destChainId as number,
    address: tokenAddress,
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
        // @ts-ignore
        address?.toLowerCase() === intermediaryDepositAddress?.toLowerCase()
      ) {
        setSwapStatus(SwapStatus.FINISHED);
      }
    },
  });
}
