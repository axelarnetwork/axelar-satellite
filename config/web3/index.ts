import { loadAssets, loadChains } from "@axelar-network/axelarjs-sdk";
import toast from "react-hot-toast";
import { Environment } from "../../utils/enums";
import { ENVIRONMENT } from "../constants";

// wagmi ready chains
import { testnetChains as evmTestnetChains } from "./evm/chains.testnet";
import { testnetChains as cosmosTestnetChains } from "./cosmos/chains.testnet";

// sdk chains (generic)
// export const allAssets = loadAssets({
//   environment: ENVIRONMENT,
// });

// export const allChains = loadChains({
//   environment: ENVIRONMENT,
// });

export const getWagmiChains = () => {
  if (ENVIRONMENT === Environment.TESTNET) return evmTestnetChains;
  if (ENVIRONMENT === Environment.MAINNET) return [];

  toast.error(`Environment "${ENVIRONMENT}" not supported`);

  return [];
};

export const getCosmosChains = () => {
  if (ENVIRONMENT === Environment.TESTNET) return cosmosTestnetChains;
  if (ENVIRONMENT === Environment.MAINNET) return [];

  toast.error(`Environment "${ENVIRONMENT}" not supported`);

  return [];
};
