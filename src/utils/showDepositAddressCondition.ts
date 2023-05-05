import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";

export interface ShowDepositAddressCondition {
  srcChain: ChainInfo | null;
  asset: AssetConfigExtended | null;
}
export const showDepositAddressCondition = ({
  srcChain,
  asset,
}: ShowDepositAddressCondition) => {
  if (!(srcChain && asset)) {
    return false;
  }
  if (srcChain.id.includes("celo") && asset.id?.includes("celo-wei")) {
    return false;
  }
  return true;
};
