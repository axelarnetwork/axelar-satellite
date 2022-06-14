import React from "react";
import Image from "next/image";

export const AddressFiller = () => {
  return (
    <div className="bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF] h-full w-36 p-[1px] rounded-lg cursor-pointer">
      <div className="flex justify-between items-center h-full w-full bg-gradient-to-b from-[#21374b] to-[#292d4b] rounded-lg p-3">
        <div className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF]">
          Autofill from
        </div>

        <div className="relative flex items-center h-full">
          <Image
            layout="intrinsic"
            height={16}
            width={16}
            src="/assets/wallets/kepler.logo.svg"
          />
        </div>
      </div>
    </div>
  );
};
