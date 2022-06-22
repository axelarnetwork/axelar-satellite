import React from "react";
import Image from "next/image";
import { useSwapStore } from "../../../store";

export const AddressFiller = () => {
  const destChain = useSwapStore((state) => state.destChain);
  const isEvm = destChain.chainInfo.module === "evm";

  if (isEvm)
    return (
      <div
        key={destChain.chainInfo.module}
        className="bg-gradient-to-b from-[#E8821E] to-[#F89C35] h-full w-32 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse"
      >
        <div className="flex justify-between items-center h-full w-full bg-[#291e14] rounded-lg p-3">
          <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#E8821E] to-[#F89C35]">
            Autofill from
          </div>

          <div className="relative flex items-center h-full">
            <Image
              layout="intrinsic"
              height={25}
              width={25}
              src="/assets/wallets/metamask.logo.svg"
            />
          </div>
        </div>
      </div>
    );

  return (
    <div
      key={destChain.chainInfo.module}
      className="bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF] h-full w-32 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse"
    >
      <div className="flex justify-between items-center h-full w-full bg-gradient-to-b from-[#21374b] to-[#292d4b] rounded-lg p-3">
        <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF]">
          Autofill from
        </div>

        <div className="relative flex items-center h-full">
          <Image
            layout="intrinsic"
            height={20}
            width={20}
            src="/assets/wallets/kepler.logo.svg"
          />
        </div>
      </div>
    </div>
  );
};
