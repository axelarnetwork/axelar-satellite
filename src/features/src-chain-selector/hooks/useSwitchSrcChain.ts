import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "~/store";

/**
 * Switches the chain based on user selection
 * Handles the case where the current asset is not compatible on selected source chain
 */
export const useSwitchSrcChain = () => {
  const allChains = useSwapStore((state) => state.allChains);
  const allAssets = useSwapStore((state) => state.allAssets);
  const asset = useSwapStore((state) => state.asset);
  const destChain = useSwapStore((state) => state.destChain);

  const setSrcChain = useSwapStore((state) => state.setSrcChain);
  const setAsset = useSwapStore((state) => state.setAsset);

  return (chain: ChainInfo) => {
    const selectedChain = allChains.find(({ id }) => id === chain.id);
    if (!selectedChain) {
      return;
    }
    const selectedChainHasAsset = selectedChain?.assets?.find(
      (_asset) => _asset.common_key === asset?.id
    );
    if (selectedChainHasAsset) {
      return setSrcChain(chain);
    }

    // if asset incompatible find fist compatible asset
    const compatibleAsset = allAssets.find(
      (_asset) =>
        !!_asset.chain_aliases[selectedChain?.chainName.toLocaleLowerCase()] &&
        !!_asset.chain_aliases[destChain?.chainName.toLocaleLowerCase()]
    );
    if (!compatibleAsset) {
      return;
    }
    setAsset(compatibleAsset);
    setSrcChain(chain);
  };
};
