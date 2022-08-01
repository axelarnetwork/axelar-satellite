import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useConnect } from "wagmi";
import toast from "react-hot-toast";
import { useWalletStore } from "../../store";

export const Web3Modal = () => {
  const { connect, connectors, error } = useConnect();
  const modalRef = useRef<any>();
  const { walletConnected } = useWalletStore((state) => state);

  // close modal upon successful connection
  useEffect(() => {
    if (walletConnected) closeModal();
  }, [walletConnected]);

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

  function handleOnWalletConnectSwitch() {
    const connector = connectors.find((c) => c.name === "WalletConnect");
    connect({ connector });
  }

  function renderConnectors() {
    return (
      <div>
        <h4 className="text-lg font-light text-white">Select Wallet</h4>
        <div className="grid grid-cols-2 mt-4 gap-x-4 gap-y-5">
          <button
            className="relative flex btn btn-neutral"
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
            <span>Wallet Connect</span>
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
            className="relative flex btn btn-primary bg-[#181A25]"
            // onClick={handleOnCoinbaseWalletSwitch}
          >
            <span>Coinbase Wallet</span>
            <div className="ml-auto">
              <Image
                src="/assets/svg/walletconnect-logo.svg"
                alt="metamask"
                layout="intrinsic"
                objectFit="contain"
                height={30}
                width={30}
              />
            </div>
          </button> */}
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
