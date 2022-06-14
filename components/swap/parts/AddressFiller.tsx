import React from "react";
import Image from "next/image";

export const AddressFiller = () => {
  return (
    <div className="bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF] h-12 w-36 p-[1px] rounded-2xl cursor-pointer">
      <div className="flex justify-between items-center h-full w-full bg-gradient-to-b from-[#21374b] to-[#292d4b] rounded-2xl p-3">
        <div className="text-xs">Autofill From</div>

        <div className="relative">IMG</div>
      </div>
    </div>
  );
};
