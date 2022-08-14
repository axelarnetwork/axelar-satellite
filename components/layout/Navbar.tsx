import React from "react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="fixed w-full pt-10">
      <nav className="container items-center w-full max-w-screen-xl px-4 mx-auto">
        <div>
          <div className="flex items-start">
            <Image
              layout="intrinsic"
              width={50}
              height={50}
              src="/assets/ui/satellite.logo.svg"
            />
            <div>
              <div className="ml-3 text-4xl font-bold">
                Satellite <span className="text-lg font-light">(Beta)</span>
              </div>
              <div className="flex justify-end -mr-3">
                <img src="/assets/ui/powered.logo.svg" width={150} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-16">
          <div className="mt-5 space-x-4">
            <button className="btn btn-sm">Getting started</button>
            <button className="btn btn-sm">Support</button>
            <button className="btn btn-sm">FAQ</button>
          </div>
        </div>
      </nav>
    </div>
  );
};
