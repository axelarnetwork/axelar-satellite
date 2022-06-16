import React from "react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="flex items-center h-16">
      <div className="container px-4 mx-auto">
        <div className="flex">
          <Image
            layout="intrinsic"
            width={50}
            height={50}
            src="/assets/ui/satellite.logo.svg"
          />
          <div className="ml-3">
            <div className="text-2xl font-bold">Satellite</div>
            <div className="text-lg font-normal">(Beta) Powered by Axelar</div>
          </div>
        </div>
      </div>
    </div>
  );
};
