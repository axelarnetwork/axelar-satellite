import React from "react";
import Image from "next/image";
import { ENVIRONMENT } from "../../config/constants";
import { useWalletStore } from "../../store";
import { useHasKeplerWallet } from "../../hooks/kepler";

export const ConnectIndicator = () => {
  const { wagmiConnected, keplrConnected } = useWalletStore();

  if ([keplrConnected, wagmiConnected].some((isActive) => isActive))
    return (
      <div>
        <span className="flex items-center">
          <div className="relative w-2 h-2 ">
            <span className="absolute flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
            </span>
          </div>
          <div className="ml-2 text-xs font-light">
            <span>Connected </span>
            <span className="text-xs text-gray-400">- {ENVIRONMENT}</span>
          </div>
        </span>
        <div className="flex pt-2 pl-4 gap-x-2">
          {wagmiConnected && (
            <Image
              height={20}
              width={20}
              src="/assets/wallets/metamask.logo.svg"
            />
          )}
          {keplrConnected && (
            <Image
              height={15}
              width={15}
              src="/assets/wallets/kepler.logo.svg"
            />
          )}
        </div>
      </div>
    );

  return (
    <span className="flex items-center">
      <div className="relative w-2 h-2">
        <span className="absolute flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
          <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
        </span>
      </div>
      <div className="ml-2 text-xs font-light">
        <span>Not Connected </span>
        <span className="text-xs text-gray-400">- {ENVIRONMENT}</span>
      </div>
    </span>
  );
};
