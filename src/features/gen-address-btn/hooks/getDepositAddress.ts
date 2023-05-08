import { useState } from "react";
import {
  AxelarAssetTransfer,
  AxelarQueryAPI,
} from "@axelar-network/axelarjs-sdk";
import { constants } from "ethers";

import { ENVIRONMENT } from "~/config/constants";

import { AssetConfigExtended } from "~/types";

const assetTransfer = new AxelarAssetTransfer({
  environment: ENVIRONMENT,
  auth: "local",
});
const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });

interface DepositAddressPayload {
  fromChain: string;
  toChain: string;
  destAddress: string;
  fromChainModule: "evm" | "axelarnet";
  asset: AssetConfigExtended;
  transferType: "deposit-address" | "wrap" | "unwrap";
}

async function _getDepositAddress(payload: DepositAddressPayload) {
  const {
    fromChain,
    toChain,
    destAddress,
    transferType,
    asset,
    fromChainModule,
  } = payload;

  if (transferType === "wrap") {
    const depositAddress = await assetTransfer.getDepositAddress({
      fromChain: fromChain,
      toChain: toChain,
      asset: asset.id.toUpperCase(),
      destinationAddress: destAddress,
    });

    return {
      intermediaryDepositAddress: null,
      finalDepositAddress: depositAddress,
    };
  }

  if (transferType === "unwrap") {
    const refundAddress = await axelarQueryApi.getContractAddressFromConfig(
      fromChainModule === "evm" ? fromChain : toChain,
      "default_refund_collector"
    );
    console.log("refund address", refundAddress);
    const intermediaryDepositAddress =
      await assetTransfer.validateOfflineDepositAddress(
        "unwrap",
        fromChain,
        toChain,
        destAddress,
        refundAddress,
        constants.HashZero
      );
    const result = await assetTransfer.getDepositAddress({
      fromChain,
      toChain,
      asset: asset.is_gas_token ? asset.wrapped_erc20 : asset.id,
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

  const depositAddress = await assetTransfer.getDepositAddress({
    fromChain,
    toChain,
    destinationAddress: destAddress,
    asset: asset.is_gas_token ? asset.wrapped_erc20 : asset.id,
  });

  return {
    intermediaryDepositAddress: null,
    finalDepositAddress: depositAddress,
  };
}

export const useGetDepositAddress = () => {
  const [loading, setLoading] = useState(false);

  async function getDepositAddress(payload: DepositAddressPayload) {
    setLoading(true);
    return _getDepositAddress(payload).finally(() => setLoading(false));
  }

  return {
    getDepositAddress,
    loading,
  };
};
