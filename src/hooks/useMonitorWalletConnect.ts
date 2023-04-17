import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useWalletStore } from "../store";

export const useMonitorWalletConnect = () => {
  const { isConnected, connector } = useAccount();
  const { setWagmiConnected } = useWalletStore();

  useEffect(() => {
    if (isConnected) {
      setWagmiConnected(true, connector?.id);
    }
    if (!isConnected) {
      setWagmiConnected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);
};
