import React from "react";
import clsx from "clsx";

import { logEvent } from "~/components/scripts";

import AssetIcon from "~/features/dest-asset-selector/components/AssetIcon";
import { useSwitchAsset } from "~/features/src-asset-selector/hooks";
import { useAssetCompatibilityBetweenChains } from "~/features/src-asset-selector/utils";

import { useSwapStore } from "~/store";

import { AssetConfigExtended } from "~/types";

interface Props {
  asset: AssetConfigExtended;
}
export const AssetDropdownItem: React.FC<Props> = ({ asset }) => {
  const switchAsset = useSwitchAsset();
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);

  const assetAliasName =
    asset.chain_aliases[srcChain.chainName?.toLowerCase()]?.assetName;

  const assetName =
    assetAliasName ?? Object.values(asset.chain_aliases)[0]?.assetName;

  if (!assetAliasName && assetName) {
    console.log(
      `Asset alias name not found for asset under ${srcChain.chainName}. Available: `,
      Object.keys(asset.chain_aliases).join(", ")
    );
  }

  const { checkCompatibility } = useAssetCompatibilityBetweenChains(
    srcChain,
    destChain
  );

  const [isCompatible, compatibilityErrorMessage] = checkCompatibility(asset);

  const disabled = !isCompatible;

  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (disabled) {
      return e.stopPropagation();
    }

    logEvent("src_asset_select", {
      assetId: asset.id,
    });
    switchAsset(asset);
  }

  return (
    <li key={asset.id}>
      <button
        onClick={handleOnClick}
        className={clsx("relative flex flex-row justify-between", { disabled })}
      >
        <div className="flex items-center gap-x-4">
          <AssetIcon assetId={asset.id} iconSrc={asset.iconSrc} size={35} />
          <span
            className={clsx({
              "text-slate-400": disabled,
            })}
          >
            {assetName}
          </span>
        </div>
        {compatibilityErrorMessage && (
          <div className="text-xs text-slate-400 text-end">
            {compatibilityErrorMessage}
          </div>
        )}
      </button>
    </li>
  );
};
