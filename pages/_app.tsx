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

import { squid } from "squid.config";

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps,
}: AppProps & WalletControllerChainOptions) {
  const [terraConfig, setTerraConfig] =
    useState<WalletControllerChainOptions>();

  useEffect(() => {
    getChainOptions().then((config) => setTerraConfig(config));
  }, []);

  if (!terraConfig) return null;

  const main = (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
        <Web3Modal />
        <GlobalHooksContainer />
        {process.env.NODE_ENV !== "development" && <GoogleAnalytics />}
      </WagmiConfig>
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  );
  const squidApi = squid;

  return typeof window !== "undefined" ? (
    <WalletProvider
      defaultNetwork={terraConfig.defaultNetwork}
      walletConnectChainIds={terraConfig.walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={terraConfig.defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
}

export default MyApp;
