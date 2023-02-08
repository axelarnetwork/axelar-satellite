import React, { PropsWithChildren } from "react";

import packages from "../../../package.json";
import { Navbar } from "./Navbar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { dependencies, version } = packages;
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="h-screen">
        <div className="container h-full max-w-screen-xl px-4 mx-auto">
          {children}
        </div>
      </main>
      <footer className="fixed left-0 flex flex-row w-full bottom-1">
        <div className="ml-2 text-xs text-slate-500">
          App version: {version}
        </div>
        <div className="ml-2 text-xs text-slate-500">
          SDK version: {dependencies?.["@axelar-network/axelarjs-sdk"]}
        </div>
        <div className="ml-2 text-xs text-slate-500">
          Squid SDK version: {dependencies?.["@0xsquid/sdk"]}
        </div>
      </footer>
    </>
  );
};
