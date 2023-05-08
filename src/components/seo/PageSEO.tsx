import React from "react";

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
  const ogImageUrl =
    "https://axelar-mainnet.s3.us-east-2.amazonaws.com/social-image-large.jpg";
  const twImageUrl =
    "https://axelar-mainnet.s3.us-east-2.amazonaws.com/social-image-large.jpg";
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
