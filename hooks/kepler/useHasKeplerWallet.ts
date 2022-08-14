import { useEffect, useState } from "react";
import { useWalletStore } from "../../store";

export const useHasKeplerWallet = () => {
  const { walletConnected } = useWalletStore();
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    if (!walletConnected) return;
    const keplr = window?.keplr;
    setHasWallet(!!keplr);
  }, [walletConnected]);

  return hasWallet;
};
