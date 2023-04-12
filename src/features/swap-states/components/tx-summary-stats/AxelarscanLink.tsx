import React from "react";
import Image from "next/image";

import { AXELARSCAN_URL } from "~/config/constants";

import { useSwapStore } from "~/store";

export const AxelarscanLink = () => {
  const txInfo = useSwapStore((state) => state.txInfo);
  return (
    <a
      className="flex items-center text-primary hover:underline gap-x-2"
      href={`${AXELARSCAN_URL}/transfer/${txInfo.sourceTxHash}`}
      target="_blank"
      rel="noreferrer"
    >
      <span>Visit Axelarscan for more information</span>
      <Image src="/assets/ui/link.svg" height={16} width={16} alt="link" />
    </a>
  );
};
