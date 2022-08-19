import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useConnect } from "wagmi";
import toast from "react-hot-toast";
import { useSwapStore, useWalletStore } from "../../store";
import { getCosmosChains } from "../../config/web3";
import { CosmosChain } from "../../config/web3/cosmos/chains.testnet";
import { OfflineSigner } from "@cosmjs/proto-signing";

export const Web3Modal = () => {
  const { connect, connectors, error } = useConnect();
  const allAssets = useSwapStore(state => state.allAssets);
  const modalRef = useRef<any>();
  const { setKeplrConnected, wagmiConnected } = useWalletStore(
    (state) => state
  );
  // close modal upon successful connection
  useEffect(() => {
    if (wagmiConnected) closeModal();
  }, [wagmiConnected]);

  // notify user that he already has a connected account but it's not the active one
  useEffect(() => {
    if (error) toast.error(error?.message);
  }, [error]);

  function closeModal() {
    if (modalRef?.current?.checked) modalRef.current.checked = false;
  }

  function handleOnMetamaskSwitch() {
    const connector = connectors.find((c) => c.name === "MetaMask");
    connect({ connector });
  }

  async function handleOnKeplrConnect() {
    const { keplr } = window;
    const axelar: CosmosChain = getCosmosChains(allAssets).find(
      (chain) => chain.chainIdentifier === "axelar"
    ) as CosmosChain;
    console.log("axlear chain id", axelar);
    try {
      await keplr?.enable(axelar.chainId);
    } catch (e) {
      console.log(
        "unable to connect to wallet natively, so trying experimental chain",
        e,
        axelar.chainId
      );
      try {
        await keplr?.experimentalSuggestChain(axelar);
        await keplr?.enable(axelar.chainId);
      } catch (e2: any) {
        console.log("and yet there is a problem in trying to do that too", e2);
      }
    }
    const _signer = (await keplr?.getOfflineSignerAuto(
      axelar.chainId
    )) as OfflineSigner;
    const [account] = await _signer.getAccounts();
    setKeplrConnected(true);
  }

  function renderConnectors() {
    return (
      <div>
        <h4 className="text-lg font-light text-white">Select Wallet</h4>
        <div className="grid grid-cols-2 mt-4 gap-x-4 gap-y-5">
          <button
            className="relative flex w-full btn btn-neutral"
            onClick={handleOnMetamaskSwitch}
          >
            <span>Metamask</span>
            <div className="ml-auto">
              <Image
                src="/assets/wallets/metamask.logo.svg"
                alt="metamask"
                layout="intrinsic"
                objectFit="contain"
                height={30}
                width={30}
              />
            </div>
          </button>
          {/* <button
            className="relative flex btn btn-neutral"
            onClick={handleOnWalletConnectSwitch}
          >
            <span>WC (Coming Soon!)</span>
            <div className="ml-auto">
              <Image
                src="/assets/wallets/walletconnect.logo.svg"
                alt="walletconnect"
                layout="intrinsic"
                objectFit="contain"
                height={30}
                width={30}
              />
            </div>
          </button> */}
          <button
            className="relative flex btn btn-neutral"
            onClick={handleOnKeplrConnect}
          >
            <span>Keplr</span>
            <div className="ml-auto">
              <Image
                src="/assets/wallets/kepler.logo.svg"
                alt="walletconnect"
                layout="intrinsic"
                objectFit="contain"
                height={30}
                width={30}
              />
            </div>
          </button>{" "}
          {/* <button
            className="relative flex btn btn-neutral"
            onClick={handleOnWalletConnectSwitch}
          >
            <span>Terra Station</span>
            <div className="ml-auto">
              <Image
                src="/assets/wallets/walletconnect.logo.svg"
                alt="walletconnect"
                layout="intrinsic"
                objectFit="contain"
                height={30}
                width={30}
              />
            </div>
          </button> */}
          {/* <button
            className="relative flex btn btn-neutral"
            disabled
            onClick={handleOnWalletConnectSwitch}
          >
            <span>Cosmostation (Coming Soon!)</span>
            <div className="ml-auto">
              <Image
                src="/assets/wallets/walletconnect.logo.svg"
                alt="walletconnect"
                layout="intrinsic"
                objectFit="contain"
                height={30}
                width={30}
              />
            </div>
          </button>{" "} */}
        </div>
      </div>
    );
  }

  return (
    <div>
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
