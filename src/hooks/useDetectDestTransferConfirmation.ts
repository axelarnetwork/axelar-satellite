import { useEffect } from "react";
import { io } from "socket.io-client";

import { SOCKET_API } from "../config/constants";
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
  const { asset, srcChain, destChain, swapStatus, setSwapStatus, destAddress } =
    useSwapStore();

  function checkPayload(data: any) {
    if (destChain && destChain.chainName?.toLowerCase() === "axelar") {
      if (data.Type !== "axelar.axelarnet.v1beta1.AxelarTransferCompleted") {
        return;
      }
      //TODO: receipient is intentionally misspelled because that is the property that is received from the emitted event
      if (!(data.Attributes.receipient as string)?.includes(destAddress)) {
        return;
      }
    } else {
      if (data.Type !== "fungible_token_packet") {
        return;
      }
      if (data.Attributes.receiver !== destAddress) {
        return;
      }
    }

    return true;
  }

  useEffect(
    () => {
      if (swapStatus !== SwapStatus.WAIT_FOR_CONFIRMATION) {
        return;
      }

      let denom;

      const sentNative =
        asset?.is_gas_token &&
        asset?.native_chain === srcChain.chainName?.toLowerCase();

      if (sentNative) {
        //for now, the native asset is not in assets[] on destChain since it is hard-coded in satellite, so
        //we check separately
        const { fullDenomPath } =
          asset.chain_aliases[destChain.chainName?.toLowerCase()];
        if (!fullDenomPath) {
          throw `chain config for ${asset.id} not defined`;
        }
        denom =
          fullDenomPath.split("/").length > 1
            ? fullDenomPath?.split("/")[2]
            : fullDenomPath?.split("/")[0];
      } else {
        denom = asset?.chain_aliases["axelar"].fullDenomPath as string;
      }

      const roomId =
        destChain?.chainName?.toLowerCase() === "axelar"
          ? buildAxelarTransferCompletedRoomId(destAddress, denom)
          : buildEvmTransferCompletedRoomId(destAddress, denom);

      console.log("room ID for transfer complete", roomId);

      socket.emit("room:join", roomId);

      socket.on("bridge-event", (data) => {
        const ok = checkPayload(data);
        if (ok) {
          setSwapStatus(SwapStatus.FINISHED);
        }
      });

      return () => {
        socket.off("bridge-event");
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [destChain, swapStatus, asset, srcChain]
  );
};
