import React from "react";
import { useAccount } from "wagmi";
import { ENVIRONMENT } from "../../config/constants";
import { useWalletStore } from "../../store";

export const ConnectIndicator = () => {
  const { walletConnected } = useWalletStore();

  if (walletConnected)
    return (
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
