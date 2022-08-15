import { FC } from "react";
import Image from "next/image";
import {
  docsLinks,
  GETTING_STARTED_MODAL,
  tokenContractDocs,
} from "../../config/constants";
import { useApplicationStateStore } from "../../store";
import { toProperCase } from "../../utils/toProperCase";

type GettingStartedProps = {};

export const GettingStarted: FC<GettingStartedProps> = ({}) => {
  const { modalId } = useApplicationStateStore((state) => state);

  if (modalId !== GETTING_STARTED_MODAL) return null;

  return (
    <div>
      {getLink({
        url: "https://www.youtube.com/watch?v=_bxEw9Otb20",
        linkTitle: "Instructional Video",
        linkDescription: `One of our devs records himself walking through a transaction from start to finish.`,
      })}
      {getLink({
        url: "https://socialaxl.medium.com/f6480c7ff20c",
        linkTitle: "Medium Instructional Guide",
        linkDescription: `A step-by-step Medium post with screenshots at each step of the way through a transaction.`,
      })}
      {getLink({
        url: tokenContractDocs[process.env.NEXT_PUBLIC_ENVIRONMENT as string],
        linkTitle: `Token Contracts & Channel IDs (${toProperCase(
          process.env.NEXT_PUBLIC_ENVIRONMENT as string
        )})`,
        linkDescription: `An IMPORTANT document with token contract addresses for all
        supported assets.`,
      })}
      {getLink({
        url: docsLinks[process.env.NEXT_PUBLIC_ENVIRONMENT as string] + "#cross-chain-relayer-gas-fee",
        linkTitle: "Minimum Transfer Amounts",
        linkDescription: `Minimum amounts depend on the selected parameters. This document lists all of them in a table.`,
      })}
    </div>
  );
};

type GetLinkProps = {
  url: string;
  linkTitle: string;
  linkDescription: string;
};

export const getLink: FC<GetLinkProps> = ({
  linkDescription,
  linkTitle,
  url,
}) => {
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
        layout="intrinsic"
        width={20}
        height={20}
        src="/assets/ui/forward-arrow-link.svg"
      />
    </a>
  );
};
