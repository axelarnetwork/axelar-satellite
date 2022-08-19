import React from "react";
import Image from "next/image";
import { useWalletStore } from "../../store";

export const ConnectIndicator = () => {
  const { wagmiConnected, keplrConnected } = useWalletStore();

  return (
    <div className="flex items-center flex-column">
      <span className="flex items-center">
        <div className="relative w-3 h-3 ">
          <span className="absolute flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
          </span>
        </div>
        <div className="mx-2 ml-2">
          <span className="text-bold">Connected </span>
        </div>
      </span>
      {wagmiConnected && (
        <Image height={30} width={30} src="/assets/wallets/metamask.logo.svg" />
      )}
      {keplrConnected && (
        <Image height={20} width={20} src="/assets/wallets/kepler.logo.svg" />
      )}
    </div>
  );
};
