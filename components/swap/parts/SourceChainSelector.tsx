import React from "react";
import Image from "next/image";

export const SourceChainSelector = () => {
  return (
    <div>
      <label className="text-xs">From</label>
      <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
        <Image
          src="/assets/chains/ethereum.logo.svg"
          layout="intrinsic"
          width={40}
          height={40}
        />
        <span>Ethereum</span>
        <div className="flex items-center">
          <Image
            src="/assets/ui/arrow-down.svg"
            layout="intrinsic"
            width={25}
            height={25}
          />
        </div>
      </div>
    </div>
  );
};
