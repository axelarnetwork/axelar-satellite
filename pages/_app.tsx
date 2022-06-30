import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

import { GlobalHooksContainer, Web3Modal } from "../components/web3";
import { wagmiClient } from "../wagmi.config";

import "animate.css";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
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
