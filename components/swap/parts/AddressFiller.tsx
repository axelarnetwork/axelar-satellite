import React from "react";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";
import {
  useWallet as useTerraWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { useSwapStore, useWalletStore } from "../../../store";
import { useGetKeplerWallet } from "../../../hooks";
import { getCosmosChains } from "../../../config/web3";

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
  const { userSelectionForCosmosWallet } = useWalletStore();

  function fillEvmDestinationAddress() {
    if (address) {
      setDestAddress(address);
    }
  }

  function handleMetamaskConnect() {
    const connector = connectors.find((c) => c.name === "MetaMask");
    connect({ connector });
  }

  async function fillCosmosDestinationAddress() {
    const chain = getCosmosChains(allAssets).find(
      (_chain) => _chain.chainIdentifier === destChain.chainName.toLowerCase()
    );
    if (!chain) return;

    if (chain.chainIdentifier === "terra" && userSelectionForCosmosWallet === "terraStation") {
      if (terraWallet.status !== WalletStatus.WALLET_CONNECTED) await terraWallet.connect();
      if (terraWallet?.wallets?.length < 1) return;
      const address = terraWallet.wallets[0].terraAddress;
      setDestAddress(address);
      return;
    }
    await keplerWallet?.experimentalSuggestChain(chain);
    await keplerWallet?.enable(chain.chainId as string);
    const address = await keplerWallet?.getKey(chain.chainId as string);
    setDestAddress(address?.bech32Address as string);
    setKeplrConnected(true);
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
          {userSelectionForCosmosWallet === "terraStation" && destChain.chainName.toLowerCase() === "terra" ? (
            <Image
              layout="intrinsic"
              height={20}
              width={20}
              src="/assets/wallets/terra-station.logo.svg"
            />
          ) : (
            <Image
              layout="intrinsic"
              height={20}
              width={20}
              src="/assets/wallets/kepler.logo.svg"
            />
          )}
        </div>
      </div>
    </div>
  );
};
