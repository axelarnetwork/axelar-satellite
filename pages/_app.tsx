import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import {
  getChainOptions,
  WalletProvider,
  WalletControllerChainOptions,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

import { GlobalHooksContainer, Web3Modal } from "../components/web3";
import { wagmiClient } from "../wagmi.config";

import "animate.css";
import "../styles/globals.css";
import "../styles/loader.css";

const queryClient = new QueryClient();

function MyApp({
  Component,
  defaultNetwork,
  walletConnectChainIds,
  pageProps,
}: AppProps & WalletControllerChainOptions) {
  const main = (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
        <Web3Modal />
        <GlobalHooksContainer />
      </WagmiConfig>
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  );

  return typeof window !== "undefined" ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
}

MyApp.getInitialProps = async () => {
  const chainOptions = await getChainOptions();
  return {
    ...chainOptions,
  };
};

export default MyApp;
