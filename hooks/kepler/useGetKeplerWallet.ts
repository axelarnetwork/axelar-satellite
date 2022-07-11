import { Keplr } from "@keplr-wallet/types";
import { useEffect, useState } from "react";

export const useGetKeplerWallet = () => {
  const [kepler, setKepler] = useState<Keplr>();

  useEffect(() => {
    const _keplr = window.keplr;
    setKepler(_keplr);
  }, [window.keplr]);

  return kepler;
};
