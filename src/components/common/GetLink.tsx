import { FC } from "react";
import Image from "next/image";

type LinkProps = {
  url: string;
  linkTitle: string;
  linkDescription: string;
};

export const Link: FC<LinkProps> = ({ linkDescription, linkTitle, url }) => {
  return (
    <a
      className="flex items-center mb-5 space-x-2"
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <div>
        <div className="text-[#FFFFFF] uppercase mr-2">{linkTitle}</div>
        <span className="text-xs text-[#4CB4FF]">{linkDescription}</span>
      </div>

      <Image
        width={20}
        height={20}
        src="/assets/ui/forward-arrow-link.svg"
        alt="Forward Arrow Link"
      />
    </a>
  );
};
