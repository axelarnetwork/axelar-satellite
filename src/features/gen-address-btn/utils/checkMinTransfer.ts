import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";
import { showErrorMsgAndThrow } from "~/utils/error";
import { getGasFee } from "~/utils/getGasFee";

export async function checkMinTransfer(
  amount: string,
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: AssetConfigExtended | null
) {
  const minDeposit = await getGasFee(srcChain, destChain, asset);
  const symbol =
    asset?.chain_aliases[srcChain?.chainName?.toLowerCase()].assetSymbol;
  if (Number(amount) < minDeposit) {
    showErrorMsgAndThrow(
      `${amount} ${symbol} is insufficient. Please transfer at least ${minDeposit} ${symbol}`
    );
  }
}
