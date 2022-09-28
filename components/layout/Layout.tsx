import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { dependencies, version } from "../../package.json";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
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
      </footer>
    </>
  );
};
