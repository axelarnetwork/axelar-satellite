import { loadAssets } from "@axelar-network/axelarjs-sdk";
import { ENVIRONMENT } from "./constants";

export const allAssets = loadAssets({
  environment: ENVIRONMENT,
});
