import { useEffect, useState } from "react";
import {
  useWallet as useTerraWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";

export const useIsTerraConnected = () => {
  const { status } = useTerraWallet();
  const [isTerraConnected, setIsTerraConnected] = useState(false);

  useEffect(() => {
    setIsTerraConnected(status === WalletStatus.WALLET_CONNECTED);
  }, [status]);

  return isTerraConnected;
};
