import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";
import { showErrorMsgAndThrow } from "~/utils/error";
import { getGasFee } from "~/utils/renderGasFee";

export async function checkMinTransfer(
  amount: string,
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: AssetConfigExtended | null
) {
  const minDeposit = await getGasFee(srcChain, destChain, asset);

  if (BigInt(amount || "0") < BigInt(minDeposit)) {
    showErrorMsgAndThrow(
      `${amount} ${asset?.id} is insufficient. Please transfer at least ${minDeposit} ${asset?.id}`
    );
  }
}
