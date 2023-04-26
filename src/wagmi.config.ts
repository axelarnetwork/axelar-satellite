import { configureChains, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import { getWagmiChains } from "./config/web3";

const { chains, provider } = configureChains(
  [...getWagmiChains()],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
    publicProvider(),
  ],
  {
    pollingInterval: 10_000,
  }
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: false,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Satellite",
        darkMode: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        showQrModal: true,
        projectId: String(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID),
      },
    }),
  ],
  provider,
});
