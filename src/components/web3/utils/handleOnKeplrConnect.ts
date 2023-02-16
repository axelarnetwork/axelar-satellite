import { AssetConfig } from "@axelar-network/axelarjs-sdk";

import { getCosmosChains } from "~/config/web3";
import { CosmosChain } from "~/config/web3/cosmos/interface";

export const connectToKeplr = async (allAssets: AssetConfig[]) => {
  const { keplr } = window;
  const axelar: CosmosChain = getCosmosChains(allAssets).find(
    (chain) => chain.chainIdentifier === "axelar"
  ) as CosmosChain;
  try {
    await keplr?.enable(axelar.chainId);
  } catch (e) {
    console.log(
      "unable to connect to wallet natively, so trying experimental chain",
      e,
      axelar.chainId
    );
    try {
      await keplr?.experimentalSuggestChain(axelar);
      await keplr?.enable(axelar.chainId);
    } catch (e2: any) {
      console.log("and yet there is a problem in trying to do that too", e2);
    }
  }
};
