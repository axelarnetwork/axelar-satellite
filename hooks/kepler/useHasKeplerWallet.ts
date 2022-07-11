import { useEffect, useState } from "react";

export const useHasKeplerWallet = () => {
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    const keplr = window.keplr;
    setHasWallet(!!keplr);
  }, [window.keplr]);

  return hasWallet;
};
