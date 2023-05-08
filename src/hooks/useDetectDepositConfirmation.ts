import { useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useBlockNumber } from "wagmi";

import { SOCKET_API } from "../config/constants";
import { getDestChainId, useSwapStore } from "../store";
import { buildDepositConfirmationRoomId, buildTokenSentRoomId } from "../utils";
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
    asset,
    srcChain,
    destChain,
    depositAddress,
    destAddress,
    setSwapStatus,
    txInfo,
    setTxInfo,
  } = useSwapStore();

  const destChainId = useSwapStore(getDestChainId);

  const { data: blockNumber } = useBlockNumber({
    chainId: destChainId as number,
    enabled: !!destChainId && destChain.module === "evm",
  });

  function checkPayloadForDepositConfirmation(data: any) {
    if (data.Type !== "depositConfirmation") {
      return;
    }
    if (data.Attributes.depositAddress !== depositAddress) {
      return;
    }
    return true;
  }
  function checkPayloadForTokenSent(data: any) {
    console.log("token sent data", data);

    if (data.Type !== "axelar.evm.v1beta1.TokenSent") {
      return;
    }
    if (
      data.Attributes.sender?.toLowerCase() !==
      depositAddress?.toLocaleLowerCase()
    ) {
      return;
    }
    if (
      data.Attributes.destination_address?.toLocaleLowerCase() !==
      destAddress?.toLocaleLowerCase()
    ) {
      return;
    }
    return true;
  }

  useEffect(
    () => {
      if (!depositAddress) {
        return;
      }

      const sentNative =
        asset?.is_gas_token &&
        asset?.native_chain === srcChain.chainName?.toLowerCase();

      let roomId;

      if (sentNative) {
        const { fullDenomPath } =
          asset?.chain_aliases?.[destChain?.chainName?.toLowerCase()] || {};
        if (!fullDenomPath) {
          toast.error(`chain config for ${asset.id} not defined`);
          return;
        }
        const denom =
          fullDenomPath.split("/").length > 1
            ? fullDenomPath?.split("/")[2]
            : fullDenomPath?.split("/")[0];
        roomId = buildTokenSentRoomId(
          srcChain,
          denom,
          destAddress?.toLowerCase(),
          destChain,
          depositAddress
        );
      } else {
        roomId = buildDepositConfirmationRoomId(
          srcChain.module,
          depositAddress
        );
      }

      console.log("room ID joined", roomId);

      socket.emit("room:join", roomId);

      socket.on("bridge-event", (data) => {
        console.log("data in bridge event", data);
        const depositConfirmationOk = checkPayloadForDepositConfirmation(data);
        const tokenSentOk = checkPayloadForTokenSent(data);
        if (!(depositConfirmationOk || tokenSentOk)) {
          return;
        }

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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [depositAddress, txInfo]
  );
};
