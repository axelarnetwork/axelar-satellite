import React from "react";
import Image from "next/image";

export const CosmosWalletTransfer = () => {
  return (
    <div>
      <div className="flex justify-center my-2 gap-x-5">
        <button>
          <Image src="/assets/wallets/kepler.logo.svg" height={20} width={20} />
        </button>
      </div>
    </div>
  );
};
