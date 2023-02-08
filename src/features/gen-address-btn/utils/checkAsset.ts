import { AssetConfigExtended } from "~/types";
import { showErrorMsgAndThrow } from "~/utils/error";

export function checkAsset(
  asset: AssetConfigExtended | null,
  tokensToTransfer: string
) {
  if (!asset) {
    showErrorMsgAndThrow("Asset can't be empty");
  }

  if (!Number(tokensToTransfer)) {
    showErrorMsgAndThrow("Please enter the amount of tokens to transfer");
  }
}
