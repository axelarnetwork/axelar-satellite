import React from "react";
import Image from "next/legacy/image";

import { defaultAssetImg } from "~/config/constants";

import { useSwitchAsset } from "~/features/asset-selector/hooks";
import {
  assetIsCompatibleBetweenChains,
  renderIncompatibilityMsg,
} from "~/features/asset-selector/utils";

import { useSwapStore } from "~/store";

import classNames from "classnames";
import { AssetConfigExtended } from "~/types";

interface Props {
  asset: AssetConfigExtended;
}
export const AssetItem: React.FC<Props> = ({ asset }) => {
  const switchAsset = useSwitchAsset();
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);

  const assetName =
    asset.chain_aliases[srcChain.chainName?.toLowerCase()]?.assetName;

  const compatibleOnSrc =
    asset.chain_aliases[srcChain?.chainName?.toLowerCase()];
  const compatibleOnDest =
    asset.chain_aliases[destChain?.chainName?.toLowerCase()];
  const disabled = !compatibleOnSrc || !compatibleOnDest;

  return (
    <li key={asset.id}>
      <button
        className={`relative flex flex-row justify-between block ${
          disabled ? "disabled" : ""
        }`}
        onClick={(e) => (disabled ? e.stopPropagation() : switchAsset(asset))}
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
              "text-slate-400": !assetIsCompatibleBetweenChains(
                asset,
                srcChain,
                destChain
              ),
            })}
          >
            {assetName}
          </span>
        </div>
        <div className="text-xs text-slate-400 text-end">
          {renderIncompatibilityMsg(asset, srcChain, destChain)}
        </div>
      </button>
    </li>
  );
};
