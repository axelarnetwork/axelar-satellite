import { useEffect } from "react";
import { useSwapStore } from "store";
import { AssetConfigExtended } from "types";

export const useAssetFilter = (
  input: string | undefined,
  setFilteredAssets: (value: AssetConfigExtended[]) => void
) => {
  const allAssets = useSwapStore((state) => state.allAssets);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);

  useEffect(() => {
    const assets = allAssets.filter((asset) => {
      const assetMatchesSearch = asset.id
        .toLowerCase()
        ?.toLowerCase()
        .includes(input || "");
      const assetIsSupportedByBothChains =
        asset.chain_aliases[srcChain?.chainName?.toLowerCase() || ""] &&
        asset.chain_aliases[destChain?.chainName?.toLowerCase() || ""];

      return assetMatchesSearch && assetIsSupportedByBothChains;
    });

    setFilteredAssets(assets);
    // eslint-disable-next-line
  }, [allAssets, input]);
};
