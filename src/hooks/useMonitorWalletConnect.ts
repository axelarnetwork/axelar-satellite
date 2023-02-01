import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useWalletStore } from "../store";

export const useMonitorWalletConnect = () => {
  const { isConnected } = useAccount();
  const { setWagmiConnected } = useWalletStore();

  useEffect(() => {
    if (isConnected) setWagmiConnected(true);
    if (!isConnected) setWagmiConnected(false);
  }, [isConnected]);
};
