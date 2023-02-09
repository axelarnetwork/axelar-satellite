import React from "react";
import Image from "next/legacy/image";
import { useWallet as useTerraWallet } from "@terra-money/wallet-provider";
import toast from "react-hot-toast";
import { useAccount, useConnect } from "wagmi";

import { logEvent } from "~/components/scripts";

import { getCosmosChains } from "../../../config/web3";
import { useGetKeplerWallet } from "../../../hooks";
import { useIsTerraConnected } from "../../../hooks/terra/useIsTerraConnected";
import { useSwapStore, useWalletStore } from "../../../store";

export const AddressFiller = () => {
  const { address } = useAccount();
  const { allAssets, setDestAddress } = useSwapStore((state) => state);
  const { connect, connectors } = useConnect();
  const { wagmiConnected, keplrConnected, setKeplrConnected } = useWalletStore(
    (state) => state
  );
  const { destChain } = useSwapStore((state) => state);
  const isEvm = destChain?.module === "evm";
  const keplerWallet = useGetKeplerWallet();
  const terraWallet = useTerraWallet();
  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();
  const { userSelectionForCosmosWallet } = useWalletStore();

  function fillEvmDestinationAddress() {
    if (address) {
      setDestAddress(address);
    }
    logEvent("dest_address_fill", {
      wallet: "metamask",
      address,
    });
  }

  function handleMetamaskConnect() {
    const connector = connectors.find((c) => c.name === "MetaMask");
    connect({ connector });
  }

  async function fillCosmosDestinationAddress() {
    const { keplr } = window;
    if (!keplr) {
      toast.error("Please install the Keplr wallet extension first!");
      return;
    }
    const chain = getCosmosChains(allAssets).find(
      (_chain) => _chain.chainIdentifier === destChain.chainName?.toLowerCase()
    );
    if (!chain) {
      return;
    }

    await keplerWallet?.experimentalSuggestChain(chain);
    await keplerWallet?.enable(chain.chainId as string);
    const address = await keplerWallet?.getKey(chain.chainId as string);
    setDestAddress(address?.bech32Address as string);
    setKeplrConnected(true);
    logEvent("dest_address_fill", {
      wallet: "keplr",
      address,
    });
  }

  async function fillTerraStationDestinationAddress() {
    const chain = getCosmosChains(allAssets).find(
      (_chain) => _chain.chainIdentifier === destChain.chainName?.toLowerCase()
    );
    console.log("calling this TS");
    if (!chain) {
      return;
    }

    if (chain.chainIdentifier === "terra") {
      if (!isTerraConnected) {
        await terraWallet.connect();
      }
      if (terraWallet?.wallets?.length < 1) {
        toast.error("Please install the Terra Station wallet extension first!");
        return;
      }
      const address = terraWallet.wallets[0].terraAddress;
      setDestAddress(address);
      logEvent("dest_address_fill", {
        wallet: "terra",
        address,
      });
      return;
    }
  }

  if (isEvm) {
    return (
      <div
        key={destChain?.module}
        className="bg-gradient-to-b from-[#E8821E] to-[#F89C35] h-full w-28 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse"
        onClick={
          wagmiConnected ? fillEvmDestinationAddress : handleMetamaskConnect
        }
      >
        <div className="flex justify-around items-center h-full w-full bg-[#291e14] rounded-lg p-3">
          <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#E8821E] to-[#F89C35]">
            {wagmiConnected ? "Autofill" : "Connect"}
          </div>

          <div className="relative flex items-center h-full">
            <Image
              layout="intrinsic"
              height={25}
              width={25}
              src="/assets/wallets/metamask.logo.svg"
              alt="metamask logo"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={destChain?.module}
      className={`bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF] h-full ${
        destChain?.chainName?.toLowerCase() === "terra" ? "w-36" : "w-28"
      } p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse`}
      onClick={
        destChain?.chainName?.toLowerCase() === "terra"
          ? () => {}
          : fillCosmosDestinationAddress
      }
    >
      <div className="flex justify-around items-center h-full w-full bg-gradient-to-b from-[#21374b] to-[#292d4b] rounded-lg p-3">
        <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF]">
          Autofill
        </div>

        <div
          className="relative flex items-center h-full"
          onClick={fillCosmosDestinationAddress}
        >
          <Image
            layout="intrinsic"
            height={20}
            width={20}
            src="/assets/wallets/kepler.logo.svg"
            alt="keplr logo"
          />
        </div>
        {destChain?.chainName?.toLowerCase() === "terra" && (
          <>
            <span className="text-xs">or</span>
            <div
              className="relative flex items-center h-full ml-1"
              onClick={fillTerraStationDestinationAddress}
            >
              <Image
                layout="intrinsic"
                height={20}
                width={20}
                src="/assets/wallets/terra-station.logo.svg"
                alt="terra station logo"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
