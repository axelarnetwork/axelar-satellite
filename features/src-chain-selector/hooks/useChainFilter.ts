import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { ASSET_RESTRICTIONS } from "config/constants";
import { useEffect } from "react";
import { useSwapStore } from "store";

export const useChainFilter = (
  input: string | undefined,
  setFilteredChains: (value: ChainInfo[]) => void
) => {
  const allChains = useSwapStore((state) => state.allChains);
  const destChain = useSwapStore((state) => state.destChain);
  const srcChain = useSwapStore((state) => state.srcChain);

  useEffect(() => {
    if (!input) {
      setFilteredChains(allChains);
      return;
    }

    const chains = allChains.filter((chain) => {
      const chainMatchesSearch = chain.chainName?.toLowerCase().includes(input);
      const isDuplicateChain =
        chain.chainName === destChain.chainName ||
        chain.chainName === srcChain.chainName;
      const chainIsRestricted = ASSET_RESTRICTIONS[0]?.hideSrcChains?.includes(
        chain.id
      );

      return chainMatchesSearch && !isDuplicateChain && !chainIsRestricted;
    });

    setFilteredChains(chains);
    // eslint-disable-next-line
  }, [allChains, input]);
};
