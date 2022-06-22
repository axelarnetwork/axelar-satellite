import { useMutation } from "react-query";
import { AxelarAssetTransfer } from "@axelar-network/axelarjs-sdk";

import { ENVIRONMENT } from "../../config/constants";

type DepositAddressPayload = {
  fromChain: string;
  toChain: string;
  destAddress: string;
  asset: string;
};

export const useGenerateDepositAddress = () =>
  useMutation((payload: DepositAddressPayload) => {
    const sdk = new AxelarAssetTransfer({
      environment: ENVIRONMENT,
      auth: "local",
    });
    return sdk.getDepositAddress(
      payload.fromChain,
      payload.toChain,
      payload.destAddress,
      payload.asset
    );
  });
