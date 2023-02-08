import React from "react";
import Image from "next/legacy/image";

import { useIsTerraConnected } from "../../hooks/terra/useIsTerraConnected";
import { useWalletStore } from "../../store";

export const ConnectIndicator = () => {
  const { wagmiConnected, keplrConnected } = useWalletStore();
  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();

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
            src="/assets/wallets/metamask.logo.svg"
            alt="Metamask Logo"
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
