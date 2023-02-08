import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";

export function assetIsCompatibleBetweenChains(
  asset: AssetConfigExtended,
  srcChain: ChainInfo,
  destChain: ChainInfo
) {
  return (
    !!asset.chain_aliases[srcChain?.chainName?.toLowerCase() || ""] &&
    !!asset.chain_aliases[destChain?.chainName?.toLowerCase() || ""]
  );
}
