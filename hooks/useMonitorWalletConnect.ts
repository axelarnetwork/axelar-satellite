import { useEffect } from "react";

import { useWalletStore } from "../store";

import { useAccount } from "wagmi";

export const useMonitorWalletConnect = () => {
  const { isConnected } = useAccount();
  const { setWagmiConnected } = useWalletStore();

  useEffect(() => {
    if (isConnected) setWagmiConnected(true);
    if (!isConnected) setWagmiConnected(false);
  }, [isConnected]);
};
