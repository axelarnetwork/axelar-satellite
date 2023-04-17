import React, { useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useConnect } from "wagmi";

import { getCosmosChains } from "~/config/web3";
import { CosmosChain } from "~/config/web3/cosmos/interface";

import { useSwapStore, useWalletStore } from "~/store";

import { useConnectTerraStation } from "~/hooks/terra/useConnectTerraStation";
import { useIsTerraConnected } from "~/hooks/terra/useIsTerraConnected";
import { useIsTerraInstalled } from "~/hooks/terra/useIsTerraInstalled";

import { connectToKeplr } from "./utils/handleOnKeplrConnect";

const DownloadButton = () => (
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

export const Web3Modal = () => {
  const { connect, connectors, error } = useConnect();

  const allAssets = useSwapStore((state) => state.allAssets);
  const modalRef = useRef<HTMLInputElement>(null);
  const {
    setKeplrConnected,
    keplrConnected,
    wagmiConnected,
    setUserSelectionForCosmosWallet,
  } = useWalletStore((state) => state);
  const isTerraInstalled = useIsTerraInstalled();
  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();
  const connectTerraStation = useConnectTerraStation();

  // close modal upon successful metamask connection
  useEffect(() => {
    if (wagmiConnected) {
      closeModal();
    }
  }, [wagmiConnected]);

  // close modal upon successful kepler connection
  useEffect(() => {
    if (keplrConnected) {
      closeModal();
    }
  }, [keplrConnected]);

  // close modal upon successful terra station connection
  useEffect(() => {
    if (isTerraConnected) {
      closeModal();
    }
  }, [isTerraConnected]);

  // notify user that he already has a connected account but it's not the active one
  useEffect(() => {
    if (error) {
      toast.error("Wallet already connected");
    }
  }, [error]);

  function closeModal() {
    if (modalRef?.current?.checked) {
      modalRef.current.checked = false;
    }
  }

  async function handleOnTerraStationConnect() {
    connectTerraStation();
  }

  async function handleOnKeplrConnect() {
    const { keplr } = window;
    const axelar: CosmosChain = getCosmosChains(allAssets).find(
      (chain) => chain.chainIdentifier === "axelar"
    ) as CosmosChain;
    await connectToKeplr(allAssets);
    const signer = await keplr?.getOfflineSignerAuto(axelar.chainId);

    if (keplrConnected) {
      toast.error("Wallet already connected");
    }
    setKeplrConnected(Boolean(signer));
    setUserSelectionForCosmosWallet("keplr");
  }

  function renderConnectors() {
    return (
      <div>
        <h4 className="text-lg font-light text-white">Select Wallet</h4>
        <div className="grid grid-cols-2 mt-4 gap-x-4 gap-y-5">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              className="relative flex w-full btn btn-neutral"
              onClick={connect.bind(null, { connector })}
            >
              <span>{connector.name}</span>
              <div className="ml-auto">
                <Image
                  src={`/assets/wallets/${connector.id.toLowerCase()}.logo.svg`}
                  alt={connector.name}
                  height={30}
                  width={30}
                />
              </div>
            </button>
          ))}
          <button
            className="relative flex btn btn-neutral"
            onClick={handleOnKeplrConnect}
          >
            <span>Keplr</span>
            <div className="ml-auto">
              <Image
                src="/assets/wallets/kepler.logo.svg"
                alt="walletconnect"
                height={30}
                width={30}
              />
            </div>
          </button>{" "}
          <button
            className={`relative flex btn btn-neutral ${
              isTerraInstalled ? "" : "tooltip"
            }`}
            data-tip={
              "Click to install the extension. Refresh Satellite once installed."
            }
            onClick={handleOnTerraStationConnect}
          >
            <span>Terra Station</span>
            <div className="ml-auto">
              {isTerraInstalled ? (
                <Image
                  src="/assets/wallets/terra-station.logo.svg"
                  alt="walletconnect"
                  height={30}
                  width={30}
                />
              ) : (
                <DownloadButton />
              )}
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="web3-modal">
      <input
        ref={modalRef}
        type="checkbox"
        id="web3-modal"
        className="modal-toggle"
      />
      <label htmlFor="web3-modal" className="modal backdrop-blur-sm">
        <div className="relative max-w-lg bg-base-100 modal-box">
          {renderConnectors()}
        </div>
      </label>
    </div>
  );
};
