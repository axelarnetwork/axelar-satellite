import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_API } from "../config/constants";
import { useSwapStore } from "../store";
import { buildDepositConfirmationRoomId } from "../utils";
import { SwapStatus } from "../utils/enums";

export const useDetectDepositConfirmation = () => {
  const { asset, srcChain, depositAddress, swapStatus, setSwapStatus } =
    useSwapStore();

  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!asset) return;
    // only connect to sockets if waiting for deposit state
    if (swapStatus !== SwapStatus.WAIT_FOR_DEPOSIT || !depositAddress) return;

    // avoid initialising socket twice
    if (!socketRef.current)
      socketRef.current = io(SOCKET_API, {
        transports: ["websocket"],
        reconnectionDelayMax: 10000,
        extraHeaders: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
        },
      });

    // build socket room id
    const roomId = buildDepositConfirmationRoomId(
      srcChain.chainInfo.module,
      depositAddress
    );

    // subscribe to socket room
    socketRef.current.emit("room:join", roomId);

    socketRef.current.on("bridge-event", (data: any) => {
      parseDepositConfirmationEvent(data);
      socketRef.current?.close();
    });
  }, [asset, swapStatus, depositAddress]);

  function parseDepositConfirmationEvent(data: any) {
    if (data.Type !== "depositConfirmation") return;
    if (data.Attributes.depositAddress !== depositAddress) return;

    setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
  }
};
