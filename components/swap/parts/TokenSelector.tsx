import React from "react";
import Image from "next/image";

export const TokenSelector = () => {
  return (
    <div>
      <label className="text-xs">I want to transfer</label>
      <div className="text-lg font-medium flex items-center space-x-2">
        <Image
          src="/assets/tokens/axl-dai.logo.svg"
          layout="intrinsic"
          width={40}
          height={40}
        />
        <span>axlDai</span>
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
