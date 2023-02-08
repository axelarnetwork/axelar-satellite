import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import toast from "react-hot-toast";

import { ENVIRONMENT } from "../config/constants";
import { Environment } from "./enums";

export function copyToClipboard(value: string) {
  if (!value) {
    return;
  }
  navigator.clipboard.writeText(value);
  toast.success("Copied to Clipboard!");
}

export function buildTokenSentRoomId(
  srcChainInfo: ChainInfo,
  denom: string,
  destinationAddress: string,
  destChainInfo: ChainInfo,
  sender: string
): string {
  const topic = {
    type: "token-sent",
    sourceChain: srcChainInfo.chainIdentifier[ENVIRONMENT],
    denom,
    destinationAddress,
    destinationChain: destChainInfo.chainIdentifier[ENVIRONMENT],
    sender,
  };

  const roomId = JSON.stringify(topic, Object.keys(topic).sort());
  console.log("constructed room ID for send native token", roomId);
  return roomId;
}

export function buildDepositConfirmationRoomId(
  module: string,
  depositAddress: string
): string {
  const topic = {
    type: "deposit-confirmation",
    sourceModule: module?.toLowerCase(),
    depositAddress,
  };

  const roomId = JSON.stringify(topic, Object.keys(topic).sort());
  console.log("constructed room ID for deposit confirmation", roomId);
  return roomId;
}

export function buildEvmTransferCompletedRoomId(
  destinationAddress: string,
  assetFullDenom: string
): string {
  const topic = {
    type: "transfer-complete",
    sourceModule: "evm",
    destinationAddress,
    denom: assetFullDenom,
  };

  return JSON.stringify(topic, Object.keys(topic).sort());
}

export function buildAxelarTransferCompletedRoomId(
  recipient: string,
  assetFullDenom: string
): string {
  const topic = {
    type: "axelar-transfer-complete",
    recipient: `\"${recipient}\"`,
    denom: assetFullDenom,
  };

  return JSON.stringify(topic, Object.keys(topic).sort());
}

function mapCosmosTestnetChains(chainId: string) {
  switch (chainId) {
    case "terra-2":
      return "pisco-1";
    case "osmosis-4":
      return "osmo-test-4";
    case "kujira":
      return "harpoon-4";
    case "sei":
      return "atlantic-1";
    case "crescent":
      return "mooncat-1-1";
    case "axelarnet":
      return "axelar-testnet-lisbon-3";
    default:
      return chainId;
  }
}

function mapCosmosMainnetChains(chainId: string) {
  switch (chainId) {
    default:
      return chainId;
  }
}

export function curateCosmosChainId(chainId: string) {
  if (ENVIRONMENT === Environment.TESTNET) {
    return mapCosmosTestnetChains(chainId);
  }

  if (ENVIRONMENT === Environment.MAINNET) {
    return mapCosmosMainnetChains(chainId);
  }
}

export * from "./roundNumberTo";
