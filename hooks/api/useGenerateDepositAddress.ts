import { useMutation } from "react-query";
import { AxelarAssetTransfer, EvmChain } from "@axelar-network/axelarjs-sdk";

import { ENVIRONMENT } from "../../config/constants";

export type transferType = "deposit-address" | "wrap" | "unwrap";
export type DepositAddressPayload = {
  fromChain: string;
  toChain: string;
  destAddress: string;
  asset: string;
  transferType: transferType;
};

export const useGenerateDepositAddress = () =>
  useMutation((payload: DepositAddressPayload) => {
    const sdk = new AxelarAssetTransfer({
      environment: ENVIRONMENT,
      auth: "local",
    });
    const { fromChain, toChain, destAddress, transferType } = payload;
    const functionMap: Record<transferType, () => Promise<any>> = {
      "deposit-address": async () =>
        await sdk.getDepositAddress(
          payload.fromChain,
          payload.toChain,
          payload.destAddress,
          payload.asset
        ),
      wrap: async () => {
        console.log("calling wrap method");
        return await sdk.getDepositAddressForNativeWrap(
          fromChain.toLowerCase() as EvmChain,
          toChain.toLowerCase() as EvmChain,
          destAddress,
          "",
          undefined
        );
      },
      unwrap: () => Promise.resolve(alert("TODO")),
    };
    return functionMap[transferType]();
  });
