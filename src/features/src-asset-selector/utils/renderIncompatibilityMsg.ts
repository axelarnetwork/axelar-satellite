import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";

export function renderIncompatibilityMsg(
  asset: AssetConfigExtended,
  srcChain: ChainInfo,
  destChain: ChainInfo
) {
  console.log("asset and source and dest", asset, srcChain, destChain);
  const incompatibleOnSrcChain =
    !asset.chain_aliases[srcChain?.chainName?.toLowerCase()];
  const incompatibleOnDestChain =
    !asset.chain_aliases[destChain?.chainName?.toLowerCase()];

  if (incompatibleOnSrcChain && incompatibleOnDestChain) {
    return `Asset is not available on ${srcChain.chainName} and  ${destChain.chainName}`;
  } else if (incompatibleOnSrcChain) {
    return `Asset is not available on ${srcChain.chainName}`;
  } else if (incompatibleOnDestChain) {
    return `Asset is not available on ${destChain.chainName}`;
  }
}
