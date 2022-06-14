import React from "react";
import Image from "next/image";

export const ChainSwitcher = () => {
  return (
    <div className="bg-gradient-to-b from-[#00fbfb] to-[#0066ff] h-12 w-12 p-[1px] rounded-2xl cursor-pointer">
      <div className="flex justify-center items-center h-full w-full bg-gradient-to-b from-[#00343d] to-[#001f3f] rounded-2xl p-3">
        <div className="relative w-full h-full">
          <Image layout="fill" src="/assets/ui/double-arrows.svg" />
        </div>
      </div>
    </div>
  );
};
