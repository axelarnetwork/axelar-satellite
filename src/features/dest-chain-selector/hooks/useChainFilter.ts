import { useEffect } from "react";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "~/store";

import { ASSET_RESTRICTIONS } from "~/config/constants";

// TODO: abstract into global hook since it's used in src-chain & dest-chain selectors
export const useChainFilter = (
  input: string | undefined,
  setFilteredChains: (value: ChainInfo[]) => void
) => {
  const allChains = useSwapStore((state) => state.allChains);
  const destChain = useSwapStore((state) => state.destChain);
  const srcChain = useSwapStore((state) => state.srcChain);

  useEffect(() => {
    const chains = allChains.filter((chain) => {
      const chainMatchesSearch = chain.chainName
        ?.toLowerCase()
        .includes(input || ""); // if input is undefined chain always matches
      const isDuplicateChain =
        chain.chainName === destChain.chainName ||
        chain.chainName === srcChain.chainName;

      const chainIsRestricted = ASSET_RESTRICTIONS[0]?.hideDestChains?.includes(
        chain.id
      );

      return chainMatchesSearch && !isDuplicateChain && !chainIsRestricted;
    });

    setFilteredChains(chains);
    // eslint-disable-next-line
  }, [allChains, input, srcChain, destChain]);
};
