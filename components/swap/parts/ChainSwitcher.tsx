import React from "react";
import Image from "next/image";

export const ChainSwitcher = () => {
  return (
    <div className="border border-[#008cfe] bg-gradient-to-b from-[#02323c] to-[#031f3d] h-10 w-10 rounded-2xl p-2.5">
      <div className="relative h-full w-full">
        <Image layout="fill" src="/assets/ui/double-arrows.svg" />
      </div>
    </div>
  );
};
