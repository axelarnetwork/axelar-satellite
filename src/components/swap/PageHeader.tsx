import React from "react";

import { useWalletStore } from "../../store";

import { useAccount } from "wagmi";

import { AXELARSCAN_URL } from "../../config/constants";

export const PageHeader = () => {
  const wagmiConnected = useWalletStore((state) => state.wagmiConnected);
  const { address } = useAccount();

  return (
    <div className="max-w-md mx-auto md:mx-0">
      <h1 className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#AECDFF] to-[#7BFEFF]">
        Satellite
      </h1>
      {/* <h2 className="mt-1 text-3xl font-bold">Powered by Axelar Network</h2> */}
      <p className="mt-4 text-lg font-light">
        Satellite is a decentralized cross-chain asset transfer application,
        which enables users to transfer assets they hold on a source chain to an
        address on a different destination chain.
      </p>

      {wagmiConnected && (
        <div className="mt-5 font-bold">
          <a
            className="flex items-center space-x-2"
            href={`${AXELARSCAN_URL}/transfers/search?senderAddress=${address}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <div className="text-[#4CB4FF] uppercase">
              Transaction History{" "}
              <span className="text-xs text-[#4CB4FF]">(Axelarscan)</span>
            </div>

            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.838 0.13155C5.76651 0.065965 5.67748 0.0225965 5.58176 0.00673106C5.48605 -0.00913436 5.38779 0.00318867 5.29896 0.0421979C5.21013 0.0812071 5.13457 0.145217 5.08148 0.226425C5.0284 0.307633 5.00009 0.402531 5 0.49955V3.99955H0.5C0.367392 3.99955 0.240215 4.05223 0.146447 4.146C0.0526784 4.23976 0 4.36694 0 4.49955L0 7.49955C0 7.63216 0.0526784 7.75934 0.146447 7.8531C0.240215 7.94687 0.367392 7.99955 0.5 7.99955H5V11.4995C5.00009 11.5966 5.0284 11.6915 5.08148 11.7727C5.13457 11.8539 5.21013 11.9179 5.29896 11.9569C5.38779 11.9959 5.48605 12.0082 5.58176 11.9924C5.67748 11.9765 5.76651 11.9331 5.838 11.8675L11.838 6.36755C11.8889 6.32072 11.9296 6.26383 11.9574 6.20049C11.9852 6.13715 11.9995 6.06873 11.9995 5.99955C11.9995 5.93037 11.9852 5.86195 11.9574 5.79861C11.9296 5.73527 11.8889 5.67838 11.838 5.63155L5.838 0.13155Z"
                fill="#4CB4FF"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};
