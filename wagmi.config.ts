import { createClient, configureChains, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { getWagmiChains } from "./config/web3";

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

export const wagmiClient = createClient({
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
