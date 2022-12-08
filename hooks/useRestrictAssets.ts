import { useEffect } from "react";
import { ASSET_RESTRICTIONS } from "../config/constants";
import { getRestrictedAssetIsSelected, useSwapStore } from "../store";

export const useRestrictAssets = () => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const allChains = useSwapStore((state) => state.allChains);

  const setDestChain = useSwapStore((state) => state.setDestChain);
  const restrictedAssetIsSelected = useSwapStore(getRestrictedAssetIsSelected);

  useEffect(() => {
    if (restrictedAssetIsSelected) {
      if (
        ASSET_RESTRICTIONS[0].restrictToDestChain !==
        destChain?.chainName?.toLowerCase()
      ) {
        // switch to chain
        const chain = allChains.find(
          (_chain) =>
            _chain.chainName.toLowerCase() ===
            ASSET_RESTRICTIONS[0].restrictToDestChain
        );
        if (chain) return setDestChain(chain);
      }
    }
    // eslint-disable-next-line
  }, [restrictedAssetIsSelected, srcChain, destChain]);
};
