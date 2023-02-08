import React, { useCallback } from "react";
import Image from "next/image";
import { useWallet as useTerraWallet } from "@terra-money/wallet-provider";
import toast from "react-hot-toast";

import { getDestCosmosChain, useSwapStore, useWalletStore } from "~/store";

import { useGetKeplerWallet } from "~/hooks";

export const KeplrOrTerraFill = () => {
  const destChain = useSwapStore((state) => state.destChain);
  const keplrConnected = useWalletStore((state) => state.keplrConnected);
  const setKeplrConnected = useWalletStore((state) => state.setKeplrConnected);
  const setDestAddress = useSwapStore((state) => state.setDestAddress);

  const destCosmosChain = useSwapStore(getDestCosmosChain);

  const keplr = useGetKeplerWallet();
  const terraStation = useTerraWallet();

  const handleOnKeplFill = useCallback(async () => {
    if (!keplr) {
      return toast.error("Please install the Keplr wallet extension first!");
    }

    async function connectKeplr() {
      if (!destCosmosChain) {
        return;
      }
      await keplr?.experimentalSuggestChain(destCosmosChain);
      await keplr?.enable(destCosmosChain.chainId as string);
      setKeplrConnected(true);
    }
    if (!keplrConnected) {
      return connectKeplr();
    }

    if (!destCosmosChain) {
      return;
    }
    const address = await keplr?.getKey(destCosmosChain.chainId);
    setDestAddress(address?.bech32Address as string);
  }, [
    keplr,
    keplrConnected,
    destCosmosChain,
    setDestAddress,
    setKeplrConnected,
  ]);

  const handleOnTerraFill = useCallback(async () => {
    await terraStation.connect();
    if (terraStation?.wallets?.length < 1) {
      console.log({
        wallets: terraStation?.wallets,
      });
      return toast.error(
        "Please install the Terra Station wallet extension first!"
      );
    }

    const address = terraStation.wallets[0].terraAddress;
    setDestAddress(address);
  }, [setDestAddress, terraStation]);

  if (
    destChain.module !== "axelarnet" ||
    (destChain.module === "axelarnet" &&
      destChain.chainName.toLowerCase() !== "terra")
  ) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF] h-full w-28 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse">
      <div className="flex justify-around items-center h-full w-full bg-gradient-to-b from-[#21374b] to-[#292d4b] rounded-lg p-3">
        <div className="relative flex items-center h-full">
          <Image
            onClick={handleOnKeplFill}
            className="duration-200 hover:-translate-y-1"
            height={20}
            width={20}
            src="/assets/wallets/kepler.logo.svg"
            alt="terra-station"
          />
        </div>
        <span className="text-xs">or</span>
        <div className="relative flex items-center h-full">
          <Image
            onClick={handleOnTerraFill}
            className="duration-200 hover:-translate-y-1"
            height={20}
            width={20}
            src="/assets/wallets/terra-station.logo.svg"
            alt="terra-station"
          />
        </div>
      </div>
    </div>
  );
};
