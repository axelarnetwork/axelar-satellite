import {
  AxelarAssetTransfer,
  AxelarQueryAPI,
} from "@axelar-network/axelarjs-sdk";
import { constants } from "ethers";
import { useMutation } from "react-query";

import { ENVIRONMENT } from "~/config/constants";
import { logEvent } from "~/components/scripts";

import { AssetConfigExtended } from "~/types";

const { HashZero } = constants;

export type DepositAddressPayload = {
  fromChain: string;
  toChain: string;
  destAddress: string;
  fromChainModule: "evm" | "axelarnet";
  asset: AssetConfigExtended;
  transferType: "deposit-address" | "wrap" | "unwrap";
};

const sdk = new AxelarAssetTransfer({
  environment: ENVIRONMENT,
  auth: "local",
});

export const useGenerateDepositAddress = () =>
  useMutation(async (payload: DepositAddressPayload) => {
    const {
      fromChain,
      toChain,
      destAddress,
      transferType,
      asset,
      fromChainModule,
    } = payload;
    if (transferType === "wrap") {
      const depositAddress = await sdk.getDepositAddress({
        fromChain: fromChain,
        toChain: toChain,
        asset: asset.id.toUpperCase(),
        destinationAddress: destAddress,
      });

      logEvent("gen_deposit_address", {
        type: "wrap",
        depositAddress,
      });

      return {
        intermediaryDepositAddress: null,
        finalDepositAddress: depositAddress,
      };
    }

    if (transferType === "unwrap") {
      const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
      const refundAddress = await axelarQueryApi.getContractAddressFromConfig(
        fromChainModule === "evm" ? fromChain : toChain,
        "default_refund_collector"
      );
      console.log("refund address", refundAddress);
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

      logEvent("gen_deposit_address", {
        type: "unwrap",
        depositAddress: result,
      });

      return {
        intermediaryDepositAddress,
        finalDepositAddress: result,
      };
    }

    const depositAddress = await sdk.getDepositAddress({
      fromChain,
      toChain,
      destinationAddress: destAddress,
      asset: asset.common_key[ENVIRONMENT],
    });

    logEvent("gen_deposit_address", {
      type: "default",
      depositAddress,
    });

    return {
      intermediaryDepositAddress: null,
      finalDepositAddress: depositAddress,
    };
  });
