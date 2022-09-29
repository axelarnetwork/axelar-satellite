import { useEffect, useState } from "react";
import {
  useWallet as useTerraWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";

export const useIsTerraConnected = () => {
  const { status } = useTerraWallet();
  const [isTerraConnected, setIsTerraConnected] = useState(false);
  const [isTerraInitializingOrConnected, setIsTerraInitializingOrConnected] = useState(true);

  useEffect(() => {
    setIsTerraConnected(status === WalletStatus.WALLET_CONNECTED);
    setIsTerraInitializingOrConnected([WalletStatus.WALLET_CONNECTED, WalletStatus.INITIALIZING].includes(status));
  }, [status]);

  return {
    isTerraConnected,
    isTerraInitializingOrConnected
  };
};
