import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "types";

export const addAssetToMetamask = async (
  asset: AssetConfigExtended,
  chain: ChainInfo
) => {
  try {
    const { id, decimals, native_chain, chain_aliases } = asset;
    const {
      tokenAddress: address,
      assetSymbol: symbol,
      assetName,
    } = chain_aliases[chain.chainName?.toLowerCase()];
    const nativeAssetSymbol = chain_aliases[native_chain].assetSymbol;

    return await (window as any).ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address,
          symbol: id === "uaxl" ? assetName : symbol,
          decimals,
          image: nativeAssetSymbol
            ? `https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/${nativeAssetSymbol?.toLowerCase()}.png`
            : "",
        },
      },
    });
  } catch (error) {
    console.log({
      error,
    });
  }
};
