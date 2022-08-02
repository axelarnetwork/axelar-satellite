import Link from "next/link";
import React from "react";

export const PageHeader = () => {
  return (
    <div className="max-w-md mx-auto md:mx-0">
      <h1 className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#AECDFF] to-[#7BFEFF]">
        Satellite
      </h1>
      <h2 className="mt-1 text-3xl font-bold">Powered by Axelar</h2>
      <p className="mt-4">
        Satellite is a decentralized cross-chain asset transfer application,
        which enables users to transfer assets they hold on a source chain to an
        address on a different destination chain.
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
