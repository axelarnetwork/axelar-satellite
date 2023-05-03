import { AssetInfo, ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";

export const addAssetToMetamaskWithAssetConfig = async (
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
    await window.ethereum?.request({
      // @ts-ignore
      method: "eth_requestAccounts",
      // @ts-ignore
      params: [],
    });

    return await window.ethereum?.request({
      // @ts-ignore
      method: "wallet_watchAsset",
      params: {
        // @ts-ignore
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

export const addTokenToMetamaskWithAssetInfo = async (asset: AssetInfo) => {
  try {
    const {
      common_key,
      decimals,
      tokenAddress: address,
      assetName,
      assetSymbol,
    } = asset;
    await window.ethereum?.request({
      // @ts-ignore
      method: "eth_requestAccounts",
      // @ts-ignore
      params: [],
    });

    return await window.ethereum?.request({
      // @ts-ignore
      method: "wallet_watchAsset",
      params: {
        // @ts-ignore
        type: "ERC20",
        options: {
          address,
          symbol: common_key === "uaxl" ? assetName : assetSymbol,
          decimals,
          image: assetSymbol
            ? `https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/${assetSymbol?.toLowerCase()}.png`
            : "",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
