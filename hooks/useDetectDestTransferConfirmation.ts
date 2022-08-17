import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ENVIRONMENT, SOCKET_API } from "../config/constants";
import { useSwapStore } from "../store";
import { buildEvmTransferCompletedRoomId } from "../utils";
import { SwapStatus } from "../utils/enums";

export const useDetectDestTransferConfirmation = () => {
  const {
    asset,
    destChain,
    depositAddress,
    swapStatus,
    setSwapStatus,
    destAddress,
  } = useSwapStore();

  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!asset) return;
    // only connect to sockets if waiting for deposit state
    if (swapStatus !== SwapStatus.WAIT_FOR_CONFIRMATION || !depositAddress)
      return;

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

    const assetCommonKey = asset?.common_key[ENVIRONMENT];
    const assetData = destChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );

    // build socket room id
    const roomId = buildEvmTransferCompletedRoomId(
      destAddress,
      assetData?.common_key as string
    );

    // subscribe to socket room
    socketRef.current.emit("room:join", roomId);

    socketRef.current.on("bridge-event", (data: any) => {
      parseResponse(data);
      socketRef.current?.close();
      socketRef.current = undefined;
    });

    return () => {
      socketRef.current?.close();
    };
  }, [asset, swapStatus, depositAddress]);

  function parseResponse(data: any) {
    if (data.Type !== "fungible_token_packet") return;
    if (data.Attributes.receiver !== destAddress) return;

    setSwapStatus(SwapStatus.FINISHED);
  }
};
