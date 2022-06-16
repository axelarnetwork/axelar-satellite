import { loadChains } from "@axelar-network/axelarjs-sdk";
import { ENVIRONMENT } from "./constants";

export const allChains = loadChains({
  environment: ENVIRONMENT,
});
