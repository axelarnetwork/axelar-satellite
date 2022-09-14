import { useEffect } from "react";
import { io } from "socket.io-client";
import { useBlockNumber } from "wagmi";

import { SOCKET_API } from "../config/constants";
import { getDestChainId, useSwapStore } from "../store";
import { buildDepositConfirmationRoomId } from "../utils";
import { SwapStatus } from "../utils/enums";

const socket = io(SOCKET_API, {
  transports: ["websocket"],
  reconnectionDelayMax: 10000,
  extraHeaders: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
  },
});

export const useDetectDepositConfirmation = () => {
  const {
    srcChain,
    destChain,
    depositAddress,
    setSwapStatus,
    txInfo,
    setTxInfo,
  } = useSwapStore();

  const destChainId = useSwapStore(getDestChainId);

  const { data: blockNumber } = useBlockNumber({
    chainId: destChainId as number,
    enabled: !!destChainId && destChain.module === "evm",
  });

  function checkPayload(data: any) {
    if (data.Type !== "depositConfirmation") return;
    if (data.Attributes.depositAddress !== depositAddress) return;
    return true;
  }

  useEffect(() => {
    if (!depositAddress) return;

    const roomId = buildDepositConfirmationRoomId(
      srcChain.module,
      depositAddress
    );

    socket.emit("room:join", roomId);

    socket.on("bridge-event", (data) => {
      const ok = checkPayload(data);
      if (!ok) return;

      if (destChain.module === "evm") {
        setTxInfo({
          sourceTxHash: data?.transactionHash || txInfo?.sourceTxHash || "",
          destStartBlockNumber: blockNumber || 1,
        });
      } else {
        setTxInfo({
          sourceTxHash: data?.transactionHash || txInfo?.sourceTxHash || "",
        });
      }

      setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
    });

    return () => {
      socket.off("bridge-event");
    };
  }, [depositAddress, txInfo]);
};
