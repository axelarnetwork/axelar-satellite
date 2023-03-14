import React, { useCallback } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { getDestCosmosChain, useSwapStore, useWalletStore } from "~/store";

import { useGetKeplerWallet } from "~/hooks";
import { makeAccessibleKeysHandler } from "~/utils/react";

export const KeplrFill = () => {
  const destChain = useSwapStore((state) => state.destChain);
  const keplrConnected = useWalletStore((state) => state.keplrConnected);
  const setKeplrConnected = useWalletStore((state) => state.setKeplrConnected);
  const setDestAddress = useSwapStore((state) => state.setDestAddress);

  const destCosmosChain = useSwapStore(getDestCosmosChain);

  const keplr = useGetKeplerWallet();

  const handleOnClick = useCallback(async () => {
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

    await connectKeplr();

    if (!destCosmosChain) {
      return;
    }
    const address = await keplr?.getKey(destCosmosChain.chainId);
    setDestAddress(address?.bech32Address as string);
  }, [keplr, destCosmosChain, setDestAddress, setKeplrConnected]);

  if (
    destChain.module !== "axelarnet" ||
    destChain.chainName.toLowerCase() === "terra"
  ) {
    return null;
  }

  return (
    <div
      className="bg-gradient-to-b group from-[#9BDBFF] to-[#DA70FF] h-full w-28 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse"
      {...makeAccessibleKeysHandler(handleOnClick)}
    >
      <div className="flex justify-around items-center h-full w-full bg-gradient-to-b from-[#21374b] to-[#292d4b] rounded-lg p-3">
        <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF]">
          {keplrConnected ? "Fill with" : "Connect"}
        </div>

        <div className="relative flex items-center h-full ">
          <Image
            className="duration-200 group-hover:-translate-y-1"
            height={20}
            width={20}
            src="/assets/wallets/kepler.logo.svg"
            alt="keplr"
          />
        </div>
      </div>
    </div>
  );
};
