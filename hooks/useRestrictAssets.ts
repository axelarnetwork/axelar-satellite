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
    const destChainNameId = (destChain as any).id;

    for (const rule of ASSET_RESTRICTIONS) {
      if (
        rule.assets.includes((asset as any)?.id || "") &&
        !rule.restrictDestChainsTo.find((c) => c === destChainNameId)
      ) {
        const chain = allChains.find(
          (_chain) =>
            !!rule.restrictDestChainsTo.find((c) => c === (_chain as any).id)
        );
        if (chain) return setDestChain(chain);
      }
    }
  }
};
