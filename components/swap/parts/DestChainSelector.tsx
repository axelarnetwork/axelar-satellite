import React from "react";
import Image from "next/image";

export const DestChainSelector = () => {
  return (
    <div>
      <label className="text-xs">To</label>
      <div className="text-lg font-medium flex items-center space-x-2">
        <Image
          src="/assets/chains/cosmos.logo.svg"
          layout="intrinsic"
          width={40}
          height={40}
        />
        <span>Cosmos</span>
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
