import { Environment } from "../utils/enums";

export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;
export const SOCKET_API = process.env.NEXT_PUBLIC_SOCKET_API as string;
export const DISABLED_CHAIN_NAMES = process.env.NEXT_PUBLIC_DISABLED_CHAIN_NAMES || "";
export const UNDER_MAINTENANCE =
  process.env.NEXT_PUBLIC_UNDER_MAINTENANCE === "true" ? true : false;

export const AXELARSCAN_URL = process.env.NEXT_PUBLIC_AXELARSCAN_URL as string;
export const RESERVED_ADDRESSES = process.env
  .NEXT_PUBLIC_RESERVED_ADDRESSES as string;

export const GETTING_STARTED_MODAL = "getting_started_modal";
export const SUPPORT_MODAL = "support_modal";
export const FAQ_MODAL = "faq_modal";
export const TOS_MODAL = "tos_modal";

export const DEFAULT_SRC_CHAIN =
  process.env.NEXT_PUBLIC_DEFAULT_SRC_CHAIN || "ethereum";
export const DEFAULT_DEST_CHAIN =
  process.env.NEXT_PUBLIC_DEFAULT_DEST_CHAIN || "osmosis";
export const DEFAULT_ASSET = process.env.NEXT_PUBLIC_DEFAULT_ASSET || "uusdc";

export const tokenContractDocs: Record<string, string> = {
  local: "https://docs.axelar.dev/dev/build/contract-addresses/testnet",
  devnet: "https://docs.axelar.dev/dev/build/contract-addresses/testnet",
  testnet: "https://docs.axelar.dev/dev/build/contract-addresses/testnet",
  mainnet: "https://docs.axelar.dev/dev/build/contract-addresses/mainnet",
};

export const docsLinks: Record<string, string> = {
  local: "https://docs.axelar.dev/releases/testnet",
  devnet: "https://docs.axelar.dev/releases/testnet",
  testnet: "https://docs.axelar.dev/releases/testnet",
  mainnet: "https://docs.axelar.dev/releases/mainnet",
};
