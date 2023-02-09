import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "~/store";

/**
 * Switches the chain based on user selection
 * Handles the case where the current asset is not compatible on selected source chain
 */
export const useSwitchDestChain = () => {
  const allChains = useSwapStore((state) => state.allChains);
  const allAssets = useSwapStore((state) => state.allAssets);
  const asset = useSwapStore((state) => state.asset);
  const srcChain = useSwapStore((state) => state.srcChain);

  const setDestChain = useSwapStore((state) => state.setDestChain);
  const setAsset = useSwapStore((state) => state.setAsset);

  return (chain: ChainInfo) => {
    const selectedChain = allChains.find((_chain) => _chain.id === chain.id);
    if (!selectedChain) {
      return;
    }
    const selectedChainHasAsset = selectedChain?.assets?.find(
      (_asset) => _asset.common_key === asset?.id
    );
    if (selectedChainHasAsset) {
      return setDestChain(chain);
    }

    // if asset incompatible find fist compatible asset
    const compatibleAsset = allAssets.find(
      (_asset) =>
        !!_asset.chain_aliases[selectedChain?.chainName.toLocaleLowerCase()] &&
        !!_asset.chain_aliases[srcChain?.chainName.toLocaleLowerCase()]
    );
    if (!compatibleAsset) {
      return;
    }
    setAsset(compatibleAsset);
    setDestChain(chain);
  };
};
