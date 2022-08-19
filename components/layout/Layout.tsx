import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { ENVIRONMENT } from "../../config/constants"
import Image from "next/image";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        {ENVIRONMENT === "testnet" && <div className="absolute gap-2 top-1 right-1 badge badge-error text-bold">{ENVIRONMENT.toUpperCase()}</div>}
        <Navbar />
      </header>
      <main className="h-screen">
        <div className="container h-full max-w-screen-xl px-4 mx-auto">
          {children}
        </div>
      </main>
      {/* <footer className="fixed bottom-0 left-0 w-full h-20">
        <div className="container relative w-full h-full max-w-screen-xl px-4 mx-auto">
          <div className="relative w-48 h-full">
            <a
              href="https://axelar.network"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                layout="fill"
                src="/assets/ui/powered.logo.svg"
                objectFit="contain"
              />
            </a>
          </div>
        </div>
      </footer> */}
    </>
  );
};
