import { useEffect, useState } from "react";

import { useWalletStore } from "~/store";

export const useHasKeplerWallet = () => {
  const { wagmiConnected } = useWalletStore();
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    if (!wagmiConnected) {
      return;
    }
    const keplr = window?.keplr;
    setHasWallet(!!keplr);
  }, [wagmiConnected]);

  return hasWallet;
};
