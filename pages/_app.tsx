import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Modal } from "../components/web3";

import { WagmiConfig, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Toaster } from "react-hot-toast";

import "animate.css";

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: true,
        shimChainChangedDisconnect: true,
      },
    }),
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
        <Web3Modal />
      </WagmiConfig>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default MyApp;
