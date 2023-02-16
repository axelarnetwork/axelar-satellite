import { useEffect, useState } from "react";
import { Keplr } from "@keplr-wallet/types";

export const useGetKeplerWallet = () => {
  const [kepler, setKepler] = useState<Keplr>();

  useEffect(() => {
    const _keplr = window?.keplr;
    setKepler(_keplr);
  }, []);

  return kepler;
};
