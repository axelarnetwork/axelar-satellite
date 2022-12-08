import { useEffect } from "react";
import { ASSET_RESTRICTIONS } from "../config/constants";
import { getRestrictedAssetIsSelected, useSwapStore } from "../store";

export const useRestrictAssets = () => {
  const asset = useSwapStore((state) => state.asset);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const allChains = useSwapStore((state) => state.allChains);

  const setDestChain = useSwapStore((state) => state.setDestChain);
  const restrictedAssetIsSelected = useSwapStore(getRestrictedAssetIsSelected);

  useEffect(() => {
    if (restrictedAssetIsSelected) restrictDestChain();
    // eslint-disable-next-line
  }, [restrictedAssetIsSelected, srcChain, destChain]);

  function restrictDestChain() {
    const destChainName = destChain?.chainName?.toLowerCase();

    for (const rule of ASSET_RESTRICTIONS) {
      if (
        rule.assets.includes(asset?.id || "") &&
        !rule.restrictDestChainsTo.includes(destChainName)
      ) {
        const chain = allChains.find((_chain) =>
          rule.restrictDestChainsTo.includes(_chain.chainName.toLowerCase())
        );
        if (chain) return setDestChain(chain);
      }
    }
  }
};
