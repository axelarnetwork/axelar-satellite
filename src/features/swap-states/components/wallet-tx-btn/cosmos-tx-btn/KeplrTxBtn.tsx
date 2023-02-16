import React from "react";
import Image from "next/image";
import { clsx } from "clsx";

import { useSwapStore } from "~/store";

import { useKeplrIBCTransfer } from "./hooks";

export const KeplrTxBtn = () => {
  const srcChain = useSwapStore((state) => state.srcChain);

  const { loading: loadingKeplr, sendIbcTokensWithKeplr } =
    useKeplrIBCTransfer();

  if (
    srcChain.module !== "axelarnet" ||
    srcChain.chainName.toLowerCase() === "terra"
  ) {
    return null;
  }

  return (
    <div>
      <div className="max-w-xs pb-4 mx-auto text-sm divider">OR</div>
      <div className="flex justify-center">
        <button
          className={clsx("mb-5 btn btn-primary", {
            loading: loadingKeplr,
          })}
          onClick={sendIbcTokensWithKeplr}
        >
          <span className="mr-2">Send from Keplr</span>
          <div className="flex justify-center my-2 gap-x-5">
            <Image
              src="/assets/wallets/kepler.logo.svg"
              height={25}
              width={25}
              alt="keplr"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
