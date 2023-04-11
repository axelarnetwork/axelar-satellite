import React from "react";
import Image from "next/image";

import { getCosmosChains } from "~/config/web3";

import { useSwapStore } from "~/store";

export const CosmosExplorerLink = React.memo(() => {
  const destAddress = useSwapStore((state) => state.destAddress);
  const destChain = useSwapStore((state) => state.destChain);

  const chain = getCosmosChains([]).find(
    (_chain) => _chain.chainIdentifier === destChain.chainName?.toLowerCase()
  );

  return (
    <div>
      <a
        className="flex items-center text-primary hover:underline gap-x-2"
        href={`${chain?.explorer}${destAddress}`}
        target="_blank"
        rel="noreferrer"
      >
        <span>See your account balance on {destChain.chainName}</span>
        <Image src="/assets/ui/link.svg" height={16} width={16} alt="link" />
      </a>
    </div>
  );
});
