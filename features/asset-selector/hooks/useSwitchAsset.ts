import { useSwapStore } from "store";

import { AssetConfigExtended } from "types";

export const useSwitchAsset = () => {
  const setAsset = useSwapStore((state) => state.setAsset);
  return (asset: AssetConfigExtended) => {
    setAsset(asset);
  };
};
