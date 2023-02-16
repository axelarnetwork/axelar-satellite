import {
  ConnectType,
  useWallet as useTerraWallet,
} from "@terra-money/wallet-provider";

import { useWalletStore } from "~/store";

import { useIsTerraInstalled } from "./useIsTerraInstalled";

export const useConnectTerraStation = () => {
  const terraWallet = useTerraWallet();
  const isTerraInstalled = useIsTerraInstalled();
  const setUserSelectionForCosmosWallet = useWalletStore(
    (state) => state.setUserSelectionForCosmosWallet
  );

  async function handleOnTerraStationConnect() {
    console.log("trying to connect");
    if (!isTerraInstalled) {
      window.open(
        "https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp",
        "_blank"
      );
      return;
    }
    try {
      terraWallet.connect(ConnectType.EXTENSION, "station");
      setUserSelectionForCosmosWallet("terraStation");
    } catch (e) {
      console.log("connection issues", e);
    }
  }

  return handleOnTerraStationConnect;
};
