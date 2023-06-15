import React, { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { pick } from "rambda";
import toast from "react-hot-toast";
import { useConnect, useDisconnect } from "wagmi";

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

const ConnectorButton = (
  props: PropsWithChildren<{
    connector: {
      id: string;
      name: string;
    };
    onClick: () => void;
  }>
) => (
  <button
    className="relative flex w-full btn btn-neutral"
    onClick={props.onClick}
  >
    <span>{props.children}</span>
    <div className="ml-auto">
      <Image
        src={`/assets/wallets/${props.connector.id.toLowerCase()}.logo.svg`}
        alt={props.connector.name}
        height={30}
        width={30}
      />
    </div>
  </button>
);

export const Web3Modal = () => {
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const allAssets = useSwapStore((state) => state.allAssets);
  const modalRef = useRef<HTMLInputElement>(null);
  const {
    setKeplrConnected,
    keplrConnected,
    wagmiConnected,
    wagmiConnectorId,
    setUserSelectionForCosmosWallet,
  } = useWalletStore(
    pick([
      "setKeplrConnected",
      "keplrConnected",
      "wagmiConnected",
      "wagmiConnectorId",
      "setUserSelectionForCosmosWallet",
    ])
  );
  const isTerraInstalled = useIsTerraInstalled();
  const { isTerraConnected } = useIsTerraConnected();
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

  const activeConnector = useMemo(
    () => connectors.find((connector) => connector.id === wagmiConnectorId),
    [connectors, wagmiConnectorId]
  );

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
          <h4 className="text-lg font-light text-white">Select Wallet</h4>
          <div className="grid md:grid-cols-2 mt-4 gap-x-4 gap-y-5">
            {activeConnector ? (
              <ConnectorButton
                connector={activeConnector}
                onClick={() =>
                  disconnect(undefined, {
                    onError: (error) => {
                      toast.error(error.message);
                    },
                  })
                }
              >
                Disconnect
              </ConnectorButton>
            ) : (
              connectors.map((connector) => (
                <ConnectorButton
                  key={connector.id}
                  connector={connector}
                  onClick={connect.bind(null, { connector })}
                >
                  {connector.name}
                </ConnectorButton>
              ))
            )}
            {!keplrConnected && (
              <ConnectorButton
                connector={{
                  id: "kepler",
                  name: "Keplr",
                }}
                onClick={handleOnKeplrConnect}
              >
                Keplr
              </ConnectorButton>
            )}
            {!isTerraConnected && (
              <button
                className={`relative flex btn btn-neutral ${
                  isTerraInstalled ? "" : "tooltip"
                }`}
                data-tip={"Install Station Wallet"}
                onClick={handleOnTerraStationConnect}
              >
                <span>Station Wallet</span>
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
            )}
          </div>
        </div>
      </label>
    </div>
  );
};
