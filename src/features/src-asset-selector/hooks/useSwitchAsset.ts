import { ASSET_RESTRICTIONS } from "~/config/constants";

import { useSquidStateStore, useSwapStore } from "~/store";

import { AssetConfigExtended } from "~/types";

export const useSwitchAsset = () => {
  const allChains = useSwapStore((state) => state.allChains);
  const allAssets = useSwapStore((state) => state.allAssets);
  const setAsset = useSwapStore((state) => state.setAsset);
  const setInitialAsset = useSwapStore((state) => state.setInitialAsset);
  const setDestChain = useSwapStore((state) => state.setDestChain);
  const destChain = useSwapStore((state) => state.destChain);
  const srcChain = useSwapStore((state) => state.srcChain);
  const setIsSquidTrade = useSquidStateStore((state) => state.setIsSquidTrade);

  return (asset: AssetConfigExtended) => {
    // check if asset is compatible with dest chain
    const destChainCompatible =
      !!asset.chain_aliases[destChain.chainName.toLowerCase()];

    // if we select an asset incompatible on destination chain, change destination chain to first compatible one
    if (!destChainCompatible && !asset.isSquidAsset) {
      const compatibleChain = allAssets.find(
        (_asset) => _asset.id === asset.id
      );
      if (!compatibleChain) {
        return;
      }
      const compatibleChainNames = Object.keys(compatibleChain?.chain_aliases);

      let nextCompatibleChainName = compatibleChainNames.find(
        (_chainName) => _chainName !== srcChain.chainName?.toLowerCase()
      );

      // take into account asset restrictions
      for (const restriction of ASSET_RESTRICTIONS) {
        if (restriction.assets.includes(asset.id)) {
          nextCompatibleChainName =
            restriction.restrictDestChainsTo[0] || nextCompatibleChainName;
        }
      }

      const nextCompatibleChain = allChains.find(
        (_chain) =>
          _chain.chainName.toLowerCase() ===
          nextCompatibleChainName?.toLowerCase()
      );
      if (nextCompatibleChain) {
        setDestChain(nextCompatibleChain);
      }
    }

    if (!destChainCompatible && asset.isSquidAsset) setIsSquidTrade(true);

    // cache the initial asset
    setInitialAsset(asset);
    // if asset not compatible with destination chain change to closest compatible dest chain
    // then change asset
    setAsset(asset);
  };
};
