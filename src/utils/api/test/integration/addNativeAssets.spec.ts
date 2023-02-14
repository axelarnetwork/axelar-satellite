import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { AssetConfigExtended } from "~/types";

import { addNativeAssets, loadAllChains } from "../..";

// TODO: must load from config file
const nativeAssets = [] as AssetConfigExtended[];

describe("addNativeAssets", () => {
  describe("when called", () => {
    let result: ChainInfo[];

    beforeEach(async () => {
      // load chains
      const chains = await loadAllChains("testnet");
      // add native assets
      result = addNativeAssets(chains, nativeAssets, "testnet");
    });

    it.only("should add native assets to chains", () => {
      const chain = result.find((chain) => chain.chainName === "avalanche");
      const hasNativeAsset = chain?.assets?.find(
        (asset) => asset.assetSymbol === "AVAX"
      );
      expect(hasNativeAsset).toBeTruthy();
    });
  });
});
