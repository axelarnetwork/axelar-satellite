import React from "react";

import { siteMetadata } from "../../data";
import { CommonSEO } from "./CommonSEO";

type PageSEOType = {
  title: string;
  description: string;
  keywords?: string;
};
export const PageSEO: React.FC<PageSEOType> = ({
  title,
  description,
  keywords,
}) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      {keywords && <meta name="keywords" content={keywords} />}
    </>
  );
};
