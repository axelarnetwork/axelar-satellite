import React from "react";
import Image from "next/image";

export const ConnectButton = () => {
  return (
    <label htmlFor="web3-modal" className="w-full btn btn-primary">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image src="/assets/ui/wallet.svg" height={16} width={16} />
        </div>
        <span>Connect Wallet</span>
      </div>
    </label>
  );
};
