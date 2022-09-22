import { useEffect } from "react";
import { io } from "socket.io-client";
import { ENVIRONMENT, SOCKET_API } from "../config/constants";
import { useSwapStore } from "../store";
import {
  buildAxelarTransferCompletedRoomId,
  buildEvmTransferCompletedRoomId,
} from "../utils";
import { SwapStatus } from "../utils/enums";

const socket = io(SOCKET_API, {
  transports: ["websocket"],
  reconnectionDelayMax: 10000,
  extraHeaders: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
  },
});

export const useDetectDestTransferConfirmation = () => {
  const { asset, destChain, swapStatus, setSwapStatus, destAddress } =
    useSwapStore();

  function checkPayload(data: any) {
    if (destChain && destChain.chainName.toLowerCase() === "axelar") {
      if (data.Type !== `axelar.axelarnet.v1beta1.AxelarTransferCompleted`)
        return;
      //TODO: receipient is intentionally misspelled because that is the property that is received from the emitted event
      if (!(data.Attributes.receipient as string)?.includes(destAddress)) return;
    } else {
      if (data.Type !== "fungible_token_packet") return;
      if (data.Attributes.receiver !== destAddress) return;
    }

    return true;
  }

  useEffect(() => {
    if (swapStatus !== SwapStatus.WAIT_FOR_CONFIRMATION) return;

    const assetCommonKey = asset?.common_key[ENVIRONMENT];
    const assetData = destChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );

    const roomId =
      destChain?.chainName.toLowerCase() === "axelar"
        ? buildAxelarTransferCompletedRoomId(
            destAddress,
            assetData?.common_key as string
          )
        : buildEvmTransferCompletedRoomId(
            destAddress,
            assetData?.common_key as string
          );

    console.log("room ID", roomId);

    socket.emit("room:join", roomId);

    socket.on("bridge-event", (data) => {
      const ok = checkPayload(data);
      if (ok) setSwapStatus(SwapStatus.FINISHED);
    });

    return () => {
      socket.off("bridge-event");
    };
  }, [destChain, swapStatus]);
};
