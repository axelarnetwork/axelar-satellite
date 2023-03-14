import { useMemo } from "react";

import { ASSET_RESTRICTIONS } from "~/config/constants";

import { useSwapStore } from "~/store";

export const useChainFilter = (input: string | undefined) => {
  const allChains = useSwapStore((state) => state.allChains);
  const destChain = useSwapStore((state) => state.destChain);
  const srcChain = useSwapStore((state) => state.srcChain);

  return useMemo(() => {
    const chains = allChains.filter((chain) => {
      const chainMatchesSearch = chain.chainName
        ?.toLowerCase()
        .includes(input || ""); // if input is undefined chain always matches
      const isDuplicateChain =
        chain.chainName === destChain.chainName ||
        chain.chainName === srcChain.chainName;
      const chainIsRestricted = ASSET_RESTRICTIONS[0]?.hideSrcChains?.includes(
        chain.id
      );

      return chainMatchesSearch && !isDuplicateChain && !chainIsRestricted;
    });

    return chains;
  }, [allChains, input, srcChain, destChain]);
};
