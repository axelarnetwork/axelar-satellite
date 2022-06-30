import { loadAssets, loadChains } from "@axelar-network/axelarjs-sdk";
import toast from "react-hot-toast";
import { Environment } from "../../utils/enums";
import { ENVIRONMENT } from "../constants";

// wagmi ready chains
import { testnetChains } from "./chains.testnet";

// sdk chains (generic)
export const allAssets = loadAssets({
  environment: ENVIRONMENT,
});

export const allChains = loadChains({
  environment: ENVIRONMENT,
});

export const getWagmiChains = () => {
  if (ENVIRONMENT === Environment.TESTNET) return testnetChains;
  if (ENVIRONMENT === Environment.MAINNET) return [];

  toast.error(`Environment "${ENVIRONMENT}" not supported`);

  return [];
};
