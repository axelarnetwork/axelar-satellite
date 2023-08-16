import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { BigNumber } from "ethers";

import { AssetConfigExtended } from "~/types";
import { showErrorMsgAndThrow } from "~/utils/error";
import { renderGasFee } from "~/utils/renderGasFee";

export async function checkMinTransfer(
  amount: string,
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: AssetConfigExtended | null
) {
  const minDeposit = await renderGasFee(srcChain, destChain, asset);

  const bnAmount = BigNumber.from(amount || "0");
  const bnMinDeposit = BigNumber.from(minDeposit);

  if (bnAmount.lt(bnMinDeposit)) {
    showErrorMsgAndThrow(
      `${amount} ${asset?.id} is insufficient. Please transfer at least ${minDeposit} ${asset?.id}`
    );
  }
}
