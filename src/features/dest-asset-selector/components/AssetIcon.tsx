import React from "react";
import Image from "next/legacy/image";

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
      layout="intrinsic"
      width={props.size}
      height={props.size}
      onError={(e) => {
        if (!props.defaultAssetImg) {
          return;
        }
        e.currentTarget.src = props.defaultAssetImg;
        e.currentTarget.srcset = props.defaultAssetImg;
      }}
      alt={props.alt}
    />
  );
};

AssetIcon.defaultProps = {
  defaultAssetImg: DEFAULT_ASSET_IMG,
  alt: "asset icon",
};

export default AssetIcon;
