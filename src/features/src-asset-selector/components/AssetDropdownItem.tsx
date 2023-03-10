import React from "react";
import Image from "next/legacy/image";
import classNames from "classnames";
import clsx from "clsx";

import { defaultAssetImg } from "~/config/constants";
import { logEvent } from "~/components/scripts";

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

  const assetName =
    asset.chain_aliases[srcChain.chainName?.toLowerCase()]?.assetName;

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
          <Image
            loading="eager"
            src={`/assets/tokens/${asset.id}.logo.svg`}
            layout="intrinsic"
            width={35}
            height={35}
            onError={(e) => {
              e.currentTarget.src = defaultAssetImg;
              e.currentTarget.srcset = defaultAssetImg;
            }}
            alt={asset.id}
          />
          <span
            className={classNames({
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
