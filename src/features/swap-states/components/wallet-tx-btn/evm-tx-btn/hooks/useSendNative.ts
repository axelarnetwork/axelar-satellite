import { useEffect } from "react";
import { utils } from "ethers";
import toast from "react-hot-toast";
import {
  useBlockNumber,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";

import { getDestChainId, getSrcChainId, useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

export function useSendNative() {
  const { chain } = useNetwork();
  const srcChainId = useSwapStore(getSrcChainId);
  const destChainId = useSwapStore(getDestChainId);

  const asset = useSwapStore((state) => state.asset);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const depositAddress = useSwapStore((state) => state.depositAddress);

  const setTxInfo = useSwapStore((state) => state.setTxInfo);
  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);

  const { data: blockNumber } = useBlockNumber({
    chainId: destChainId as number,
    enabled: !!destChainId,
  });

  // prepare tx to detect potential errors
  const { config: sendTxConfig } = usePrepareSendTransaction({
    enabled:
      chain?.id === srcChainId && !!tokensToTransfer && asset?.is_gas_token,
    chainId: srcChainId as number,
    request: {
      to: depositAddress,
      value: utils.parseUnits(
        tokensToTransfer ? tokensToTransfer : "0",
        asset?.decimals
      ),
    },
    onError() {
      toast.error(
        `Can't estimate gas limit for transaction. Please verify that you are not trying to transfer more native assets than what you have. Transaction might fail if you proceed.`
      );
    },
  });

  // tx execution
  const { sendTransaction, isLoading, isSuccess, data, error } =
    useSendTransaction(sendTxConfig);

  // const { write, isLoading, isSuccess, data, error } =
  //   useContractWrite(contractWriteConfig);

  // on tx success save tx metadata in store for further use
  useEffect(() => {
    if (!(isSuccess && data)) {
      return;
    }
    setTxInfo({
      sourceTxHash: data.hash,
      destStartBlockNumber: blockNumber,
    });
    setSwapStatus(SwapStatus.WAIT_FOR_SRC_TX_PROPAGATION);
  }, [isSuccess, data, setTxInfo, blockNumber, setSwapStatus]);

  // detect tx error
  useEffect(() => {
    // error types don't match, maybe update to wagmi will fix
    if (!error) {
      return;
    }
    const _error = error as Error & { code?: string };
    if (_error.code === "ACTION_REJECTED") {
      toast.error("Transaction cancelled");
      return;
    }
    toast.error(_error?.message as string);
  }, [error]);

  return {
    sendNative: sendTransaction,
    loading: isLoading,
  };
}
