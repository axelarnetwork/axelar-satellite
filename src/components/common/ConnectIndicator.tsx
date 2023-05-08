import React from "react";
import Image from "next/image";
import { pick } from "rambda";

import { useWalletStore } from "~/store";

import { useIsTerraConnected } from "~/hooks/terra/useIsTerraConnected";

export const ConnectIndicator = () => {
  const { wagmiConnected, keplrConnected, wagmiConnectorId } = useWalletStore(
    pick(["wagmiConnected", "keplrConnected", "wagmiConnectorId"])
  );
  const { isTerraConnected } = useIsTerraConnected();

  const wagmiConnectorIdLabel = wagmiConnectorId?.toLowerCase() ?? "metamask";

  return (
    <div className="flex items-center flex-column">
      <span className="flex items-center">
        <div className="relative w-2 h-2 ">
          <span className="absolute flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full" />
          </span>
        </div>
        <div className="mx-2 ml-2">
          <span className="text-xs">Connected</span>
        </div>
      </span>
      <div className="flex gap-x-2">
        {wagmiConnected && (
          <Image
            height={25}
            width={25}
            src={`/assets/wallets/${wagmiConnectorIdLabel}.logo.svg`}
            className="h-[25px] w-[25px]"
            alt={`${wagmiConnectorIdLabel} Logo`}
          />
        )}
        {keplrConnected && (
          <Image
            height={18}
            width={18}
            src="/assets/wallets/kepler.logo.svg"
            alt="Keplr Logo"
          />
        )}
        {isTerraConnected && (
          <Image
            height={18}
            width={18}
            src="/assets/wallets/terra-station.logo.svg"
            alt="Terra Station Logo"
          />
        )}
      </div>
    </div>
  );
};
