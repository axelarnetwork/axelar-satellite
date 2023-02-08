import { AssetInfo, ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";

export function addNativeAssets(
  chains: ChainInfo[],
  nativeAssets: AssetConfigExtended[],
  environment: string
) {
  for (const chain of chains) {
    const chainName = chain.chainName?.toLowerCase();
    const nativeAssetConfig = nativeAssets.find(
      (asset) => asset.native_chain === chainName
    );

    if (!nativeAssetConfig) {
      continue;
    }

    const nativeAsset: AssetInfo = {
      ...nativeAssetConfig.chain_aliases[chainName],
      common_key: nativeAssetConfig.id,
      decimals: nativeAssetConfig.decimals,
      fullySupported: nativeAssetConfig.fully_supported,
      native_chain: nativeAssetConfig.native_chain,
      // @ts-ignore
      is_native_asset: nativeAssetConfig.is_native_asset,
    };

    // TODO: remove AssetInfo casting when sdk has been updated
    chain.assets = [...(chain.assets as AssetInfo[]), nativeAsset];
  }

  return chains;
}
