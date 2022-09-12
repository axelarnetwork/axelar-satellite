import { AssetConfig, ChainInfo } from "@axelar-network/axelarjs-sdk";
import Big from "big.js";

export function renderGasFee(
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: AssetConfig
) {
  if (!srcChain || !destChain) return "";

  const sourceChainName = srcChain.chainName?.toLowerCase();
  const destChainName = destChain.chainName?.toLowerCase();

  const sourceFee = asset?.chain_aliases[sourceChainName]?.minDepositAmt;
  const destFee = asset?.chain_aliases[destChainName]?.minDepositAmt;

  if (!sourceFee || !destFee) return "0";
  return Big(sourceFee).add(Big(destFee)).toString();
}
