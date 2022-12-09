import { useMutation } from "react-query";
import { AxelarAssetTransfer, AxelarQueryAPI } from "@axelar-network/axelarjs-sdk";
import { ENVIRONMENT } from "../../config/constants";
import { constants } from "ethers";
import { NativeAssetConfig } from "../../config/web3/evm/native-assets";

const { HashZero } = constants;

export type DepositAddressPayload = {
  fromChain: string;
  toChain: string;
  destAddress: string;
  asset: NativeAssetConfig;
  transferType: "deposit-address" | "wrap" | "unwrap";
};

const sdk = new AxelarAssetTransfer({
  environment: ENVIRONMENT,
  auth: "local",
});

export const useGenerateDepositAddress = () =>
  useMutation(async (payload: DepositAddressPayload) => {
    const { fromChain, toChain, destAddress, transferType, asset } = payload;
    if (ENVIRONMENT === "testnet") {
      if (transferType === "wrap") {
        const depositAddress = await sdk.getDepositAddress({
          fromChain: fromChain,
          toChain: toChain,
          asset: asset.gas_token as string,
          destinationAddress: destAddress,
        });

        return {
          intermediaryDepositAddress: null,
          finalDepositAddress: depositAddress,
        };
      }

      if (transferType === "unwrap") {
        const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
        const refundAddress = await axelarQueryApi.getContractAddressFromConfig(
          fromChain,
          "default_refund_collector"
        );
        const intermediaryDepositAddress =
          await sdk.validateOfflineDepositAddress(
            "unwrap",
            fromChain,
            toChain,
            destAddress,
            refundAddress,
            HashZero
          );
        const result = await sdk.getDepositAddress({
          fromChain,
          toChain,
          asset: asset.common_key[ENVIRONMENT],
          destinationAddress: destAddress,
          options: {
            shouldUnwrapIntoNative: true,
            refundAddress: refundAddress,
          },
        });

        return {
          intermediaryDepositAddress,
          finalDepositAddress: result,
        };
      }
    }

    const depositAddress = await sdk.getDepositAddress({
      fromChain,
      toChain,
      destinationAddress: destAddress,
      asset: asset.common_key[ENVIRONMENT],
    });

    return {
      intermediaryDepositAddress: null,
      finalDepositAddress: depositAddress,
    };
  });
