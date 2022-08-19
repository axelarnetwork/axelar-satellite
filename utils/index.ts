import toast from "react-hot-toast";
import { ENVIRONMENT } from "../config/constants";
import { Environment } from "./enums";

export function copyToClipboard(value: string) {
  if (!value) return;
  navigator.clipboard.writeText(value);
  toast.success("copied to clipboard!");
}

export function buildDepositConfirmationRoomId(
  module: string,
  depositAddress: string
): string {
  const topic = {
    type: "deposit-confirmation",
    sourceModule: module.toLowerCase(),
    depositAddress,
  };

  return JSON.stringify(topic, Object.keys(topic).sort());
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
  if (ENVIRONMENT === Environment.TESTNET)
    return mapCosmosTestnetChains(chainId);

  if (ENVIRONMENT === Environment.MAINNET)
    return mapCosmosMainnetChains(chainId);
}
