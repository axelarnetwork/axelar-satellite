import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalHooksContainer, Web3Modal } from "../components/web3";

import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
  createStorage,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import { Toaster } from "react-hot-toast";

import "animate.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { getWagmiChains } from "../config/web3";
import { useMonitorWalletConnect } from "../hooks";

const { chains, provider } = configureChains(
  [...defaultChains, ...getWagmiChains()],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        shimDisconnect: true,
        shimChainChangedDisconnect: true,
      },
    }),
  ],
  provider,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
          <Web3Modal />
          <GlobalHooksContainer />
        </WagmiConfig>
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
