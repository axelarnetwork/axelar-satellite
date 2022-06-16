import Link from "next/link";
import React from "react";

export const PageHeader = () => {
  return (
    <div className="max-w-md">
      <h1 className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#AECDFF] to-[#7BFEFF]">
        Satellite
      </h1>
      <h2 className="my-4 text-3xl font-bold">Powered by Axelar</h2>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </p>
      <div className="mt-5 space-x-4">
        <button className="btn">Getting started</button>
        <button className="btn">Support</button>
        <button className="btn">FAQ</button>
      </div>

      <div className="mt-5 text-[#8AB1FF] font-bold">
        <Link href="/history">See my transaction history</Link>
      </div>
    </div>
  );
};
