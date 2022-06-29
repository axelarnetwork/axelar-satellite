import { loadAssets, loadChains } from "@axelar-network/axelarjs-sdk";
import { ENVIRONMENT } from "../constants";

// wagmi ready chains
export * from "./chains.testnet";

// sdk chains (generic)
export const allAssets = loadAssets({
  environment: ENVIRONMENT,
});

export const allChains = loadChains({
  environment: ENVIRONMENT,
});
