import { useMutation } from "react-query";
import { AxelarAssetTransfer } from "@axelar-network/axelarjs-sdk";
import { ENVIRONMENT } from "../../config/constants";
import { constants } from "ethers";

const { HashZero } = constants;

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
  useMutation(async (payload: DepositAddressPayload) => {
    const { fromChain, toChain, destAddress, transferType, asset } = payload;

    if (transferType === "wrap") {
      const depositAddress = await sdk.getDepositAddressForNativeWrap(
        fromChain,
        toChain,
        destAddress
      );

      return {
        intermediaryDepositAddress: null,
        finalDepositAddress: depositAddress,
      };
    }

    if (transferType === "unwrap") {
      const refundAddress = await sdk.getGasReceiverContractAddress(fromChain);
      const intermediaryDepositAddress =
        await sdk.validateOfflineDepositAddress(
          "unwrap",
          fromChain,
          toChain,
          destAddress,
          refundAddress,
          HashZero
        );
      const result = await sdk.getDepositAddressForNativeUnwrap(
        fromChain,
        toChain,
        destAddress
      );
      return {
        intermediaryDepositAddress,
        finalDepositAddress: result,
      };
    }

    const depositAddress = await sdk.getDepositAddress(
      fromChain,
      toChain,
      destAddress,
      asset
    );
    return {
      intermediaryDepositAddress: null,
      finalDepositAddress: depositAddress,
    };
  });
