import React from "react";
import Image from "next/image";

import { getWagmiChains } from "~/config/web3";

import { useSwapStore } from "~/store";

const EvmExplorerLink = React.memo(() => {
  const destAddress = useSwapStore((state) => state.destAddress);
  const destChain = useSwapStore((state) => state.destChain);

  const evmRpc = getWagmiChains().find(
    (network) =>
      network.networkNameOverride === destChain.chainName.toLowerCase()
  )?.blockExplorers?.default;
  const { name, url } = evmRpc as { name: string; url: string };

  return (
    <div>
      <a
        className="flex items-center text-primary hover:underline gap-x-2"
        href={`${url}/address/${destAddress}`}
        target="_blank"
        rel="noreferrer"
      >
        <span>See your account balance on {name}</span>
        <Image src="/assets/ui/link.svg" height={16} width={16} alt="link" />
      </a>
    </div>
  );
});

export { EvmExplorerLink };
