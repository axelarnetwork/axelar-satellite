import { AxelarQueryAPI, ChainInfo } from "@axelar-network/axelarjs-sdk";
import { formatUnits } from "ethers/lib/utils.js";

import { ENVIRONMENT } from "~/config/constants";

import { AssetConfigExtended } from "~/types";

export async function getGasFee(
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: AssetConfigExtended | null
) {
  const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
  const id = asset?.wrapped_erc20 || asset?.id;

  const feeQuery = await axelarQueryApi
    .getTransferFee(srcChain?.id, destChain?.id, id as string, 0)
    .then((res) => formatUnits(res.fee?.amount as string, asset?.decimals))
    .catch(() => "0");

  if (feeQuery) {
    return BigInt(feeQuery);
  }

  if (!(srcChain && destChain)) {
    return BigInt(0);
  }

  const sourceChainName = srcChain.chainName?.toLowerCase();
  const destChainName = destChain.chainName?.toLowerCase();

  const sourceFee = BigInt(
    asset?.chain_aliases[sourceChainName]?.minDepositAmt ?? 0
  );
  const destFee = BigInt(
    asset?.chain_aliases[destChainName]?.minDepositAmt ?? 0
  );

  if (!(Boolean(sourceFee) && Boolean(destFee))) {
    return BigInt(0);
  }

  return sourceFee + destFee;
}
