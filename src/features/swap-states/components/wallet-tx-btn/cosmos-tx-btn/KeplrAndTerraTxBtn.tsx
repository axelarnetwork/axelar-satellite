import React from "react";
import Image from "next/image";
import clsx from "clsx";

import { useSwapStore } from "~/store";

import { useKeplrIBCTransfer, useTerraTransfer } from "./hooks";

export const KeplrAndTerraTxBtn = () => {
  const srcChain = useSwapStore((state) => state.srcChain);

  const { loading: loadingKeplr, sendIbcTokensWithKeplr } =
    useKeplrIBCTransfer();

  const { loading: loadingTerra, sendTokensWithTerra } = useTerraTransfer();

  if (srcChain.chainName.toLowerCase() !== "terra") {
    return null;
  }

  return (
    <div>
      <div className="max-w-xs pb-4 mx-auto text-sm divider">
        or transfer from
      </div>
      <div className="flex justify-center">
        <div className="mb-4 btn-group">
          <button
            className={clsx("btn", {
              loading: loadingKeplr,
            })}
            style={{
              borderColor: "#1c2937",
            }}
            onClick={sendIbcTokensWithKeplr}
          >
            <span className="mr-2">Keplr</span>
            <div className="flex justify-center my-2 gap-x-5">
              <Image
                src="/assets/wallets/kepler.logo.svg"
                height={25}
                width={25}
                alt="keplr"
              />
            </div>
          </button>
          <button
            className={clsx("btn", {
              loading: loadingTerra,
            })}
            style={{
              borderColor: "#1c2937",
            }}
            onClick={sendTokensWithTerra}
          >
            <span className="mr-2">Terra</span>
            <div className="flex justify-center my-2 gap-x-5">
              <Image
                src="/assets/wallets/terra-station.logo.svg"
                height={25}
                width={25}
                alt="terra-station"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
