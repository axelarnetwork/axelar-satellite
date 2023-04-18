import type { AppProps } from "next/app";
import {
  StaticWalletProvider,
  WalletControllerChainOptions,
  WalletProvider,
  getChainOptions,
} from "@terra-money/wallet-provider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { WagmiConfig } from "wagmi";

import { GoogleAnalytics } from "../components/scripts";
import { GlobalHooksContainer, Web3Modal } from "../components/web3";
import { wagmiClient } from "../wagmi.config";

import "animate.css";
import "../styles/globals.css";
import "../styles/loader.css";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({
  Component,
  pageProps,
}: AppProps & WalletControllerChainOptions) {
  const [terraConfig, setTerraConfig] =
    useState<WalletControllerChainOptions>();

  useEffect(() => {
    getChainOptions().then((config) => setTerraConfig(config));
  }, []);

  if (!terraConfig) {
    return null;
  }

  const main = (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
        <Web3Modal />
        <GlobalHooksContainer />
        {process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet" && (
          <GoogleAnalytics />
        )}
      </WagmiConfig>
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  );

  return typeof window !== "undefined" ? (
    <WalletProvider {...terraConfig}>{main}</WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={terraConfig.defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
}

export default MyApp;
