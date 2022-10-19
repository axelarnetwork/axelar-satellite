import { BigNumber } from "ethers";
import { erc20ABI, useContractEvent } from "wagmi";
import { ENVIRONMENT } from "../config/constants";
import Big from "big.js";

import { getDestChainId, useSwapStore } from "../store";
import { renderGasFee } from "../utils/renderGasFee";
import { NativeAssetConfig } from "../config/nativeAssetList/testnet";
import { SwapStatus } from "../utils/enums";

export function useDetectUnwrapTransfer() {
  const destChainId = useSwapStore(getDestChainId);
  const { asset, srcChain, destChain, tokensToTransfer, setSwapStatus } =
    useSwapStore();

  const fee = renderGasFee(srcChain, destChain, asset as NativeAssetConfig);

  useContractEvent({
    chainId: destChainId as number,
    addressOrName:
      (asset?.chain_aliases[destChain.chainIdentifier[ENVIRONMENT]]
        ?.tokenAddress as string) || "0x",
    contractInterface: erc20ABI,
    eventName: "Transfer",
    listener: (event) => {
      if (asset?.native_chain !== destChain.chainIdentifier[ENVIRONMENT])
        return;
      try {
        const number = BigNumber.from(event[2]).toString();
        const check = Big(tokensToTransfer)
          .minus(fee)
          .times(10 ** (asset?.decimals as number))
          .toString();

        if (number === check) setSwapStatus(SwapStatus.FINISHED);
      } catch (error) {}
    },
  });
}
