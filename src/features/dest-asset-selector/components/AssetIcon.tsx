import React from "react";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  assetId?: string;
  iconSrc?: string;
  size: number;
  defaultAssetImg?: string;
  alt?: string;
};

const DEFAULT_ASSET_IMG = "/assets/tokens/default.logo.svg";

const AssetIcon = (props: Props) => {
  return (
    <Image
      loading="eager"
      src={props.iconSrc ?? `/assets/tokens/${props.assetId}.logo.svg`}
      width={props.size}
      height={props.size}
      onError={(e) => {
        const defaultAssetImg = props.iconSrc ?? props.defaultAssetImg;
        if (!defaultAssetImg) {
          return;
        }
        e.currentTarget.src = defaultAssetImg;
        e.currentTarget.srcset = defaultAssetImg;
      }}
      alt={props.alt ?? "asset"}
      className={clsx({
        "rounded-full overflow-hidden": props.iconSrc,
      })}
    />
  );
};

AssetIcon.defaultProps = {
  defaultAssetImg: DEFAULT_ASSET_IMG,
  alt: "asset icon",
};

export default AssetIcon;
