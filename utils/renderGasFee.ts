import {
  AssetConfig,
  AxelarQueryAPI,
  ChainInfo,
} from "@axelar-network/axelarjs-sdk";
import Big from "big.js";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { ENVIRONMENT } from "../config/constants";
import { NativeAssetConfig } from "../config/nativeAssetList/testnet";

export async function renderGasFee(
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: NativeAssetConfig
) {
  const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
  const feeQuery = await axelarQueryApi
    .getTransferFee(
      srcChain.chainIdentifier[ENVIRONMENT],
      destChain.chainIdentifier[ENVIRONMENT],
      asset.common_key[ENVIRONMENT],
      0
    )
    .then((res) => formatUnits(res.fee?.amount as string, asset.decimals))
    .catch((e) => null);
  if (feeQuery) return feeQuery;

  if (!srcChain || !destChain) return "";

  const sourceChainName = srcChain.chainName?.toLowerCase();
  const destChainName = destChain.chainName?.toLowerCase();

  const sourceFee = asset?.chain_aliases[sourceChainName]?.minDepositAmt;
  const destFee = asset?.chain_aliases[destChainName]?.minDepositAmt;

  if (!sourceFee || !destFee) return "0";
  return Big(sourceFee).add(Big(destFee)).toString();
}
