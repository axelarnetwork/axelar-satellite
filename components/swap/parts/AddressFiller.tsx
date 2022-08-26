import React from "react";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/router";

import { useSwapStore, useWalletStore } from "../../../store";
import { useGetKeplerWallet, useHasKeplerWallet } from "../../../hooks";
import { getCosmosChains } from "../../../config/web3";

export const AddressFiller = () => {
  const { address } = useAccount();
  const { allAssets, setDestAddress } = useSwapStore((state) => state);
  const { connect, connectors } = useConnect();
  const { wagmiConnected, keplrConnected } = useWalletStore((state) => state);
  const { destChain } = useSwapStore((state) => state);
  const isEvm = destChain?.module === "evm";
  const router = useRouter();
  const hasKeplerWallet = useHasKeplerWallet();
  const keplerWallet = useGetKeplerWallet();

  function updateQueryParams() {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        destination_address: address,
      },
    });
  }

  function fillEvmDestinationAddress() {
    if (address) setDestAddress(address);
  }

  function handleMetamaskConnect() {
    const connector = connectors.find((c) => c.name === "MetaMask");
    connect({ connector });
  }

  async function fillCosmosDestinationAddress() {
    if (hasKeplerWallet) {
      const chain = getCosmosChains(allAssets).find(
        (_chain) => _chain.chainIdentifier === destChain.chainName
      );
      if (!chain) return;
      await keplerWallet?.experimentalSuggestChain(chain);
      await keplerWallet?.enable(chain.chainId as string);
      const address = await keplerWallet?.getKey(chain.chainId as string);
      setDestAddress(address?.bech32Address as string);
      updateQueryParams();
    }
  }

  if (isEvm)
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
            />
          </div>
        </div>
      </div>
    );

  return (
    <div
      key={destChain?.module}
      className="bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF] h-full w-28 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse"
      onClick={fillCosmosDestinationAddress}
    >
      <div className="flex justify-around items-center h-full w-full bg-gradient-to-b from-[#21374b] to-[#292d4b] rounded-lg p-3">
        <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#9BDBFF] to-[#DA70FF]">
          {keplrConnected ? "Autofill" : "Connect"}
        </div>

        <div className="relative flex items-center h-full">
          <Image
            layout="intrinsic"
            height={20}
            width={20}
            src="/assets/wallets/kepler.logo.svg"
          />
        </div>
      </div>
    </div>
  );
};
