import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useWalletStore } from "../store";

export const useMonitorWalletConnect = () => {
  const { isConnected } = useAccount();
  const { setWalletConnected } = useWalletStore();

  useEffect(() => {
    if (isConnected) setWalletConnected(true);
    if (!isConnected) setWalletConnected(false);
  }, [isConnected]);
};
