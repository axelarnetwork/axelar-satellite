import { useMutation } from "react-query";
import { AxelarAssetTransfer } from "@axelar-network/axelarjs-sdk";
import { ENVIRONMENT } from "../../config/constants";

export type DepositAddressPayload = {
  fromChain: string;
  toChain: string;
  destAddress: string;
  asset: string;
  transferType: "deposit-address" | "wrap" | "unwrap";
};

const sdk = new AxelarAssetTransfer({
  environment: ENVIRONMENT,
  auth: "local",
});

export const useGenerateDepositAddress = () =>
  useMutation((payload: DepositAddressPayload) => {
    const { fromChain, toChain, destAddress, transferType, asset } = payload;

    if (transferType === "wrap") {
      return sdk.getDepositAddressForNativeWrap(
        fromChain,
        toChain,
        destAddress
      );
    }
    if (transferType === "unwrap") {
      return sdk.getDepositAddressForNativeUnwrap(
        fromChain,
        toChain,
        destAddress,
        ""
      );
    }

    return sdk.getDepositAddress(fromChain, toChain, destAddress, asset);
  });
