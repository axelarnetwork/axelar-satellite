import reservedAddresses from "./reservedAddresses";

/**
 * Injects correct env values based on selected network (testnet | mainnet)
 */
export function loadEnv() {
  const network: string | undefined = process.env.NEXT_PUBLIC_ENVIRONMENT;

  switch (network) {
    case "mainnet": {
      process.env.NEXT_PUBLIC_SOCKET_API =
        "https://nest-server-mainnet.axelar.dev";
      process.env.NEXT_PUBLIC_RESERVED_ADDRESSES = reservedAddresses;
      process.env.NEXT_PUBLIC_SQUID_URL = "https://api.0xsquid.com";
      process.env.NEXT_PUBLIC_AXELARSCAN_URL = "https://axelarscan.io";
      process.env.SHOULD_ENABLE_SQUID = "false";
      break;
    }
    case "testnet": {
      process.env.NEXT_PUBLIC_SOCKET_API =
        "https://nest-server-testnet.axelar.dev";
      process.env.NEXT_PUBLIC_SQUID_URL = "https://testnet.api.0xsquid.com";
      process.env.NEXT_PUBLIC_AXELARSCAN_URL = "https://testnet.axelarscan.io";
      process.env.SHOULD_ENABLE_SQUID = "true";
      process.env.NEXT_PUBLIC_RESERVED_ADDRESSES = reservedAddresses;
      break;
    }
    default:
      throw new Error(`Network ${network} unsupported`);
  }
}
