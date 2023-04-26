import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  wagmiConnected: boolean;
  wagmiConnectorId?: string;
  keplrConnected: boolean;
  userSelectionForCosmosWallet: "terraStation" | "keplr";
}

const initialWalletState: WalletState = {
  wagmiConnected: false,
  keplrConnected: false,
  userSelectionForCosmosWallet: "keplr",
};

interface WalletStore extends WalletState {
  setWagmiConnected: (state: boolean, connectorId?: string) => void;
  setKeplrConnected: (state: boolean) => void;
  setUserSelectionForCosmosWallet: (state: "terraStation" | "keplr") => void;
}
export const useWalletStore = create<WalletStore>()(
  persist(
    (set, _get) => ({
      ...initialWalletState,
      setWagmiConnected: (wagmiConnected, connectorId = "metaMask") =>
        set({
          wagmiConnected,
          wagmiConnectorId: wagmiConnected ? connectorId : undefined,
        }),
      setKeplrConnected: (keplrConnected) => set({ keplrConnected }),
      setUserSelectionForCosmosWallet: (
        userSelectionForCosmosWallet: "terraStation" | "keplr"
      ) => set({ userSelectionForCosmosWallet }),
    }),
    {
      name: "walletStore",
    }
  )
);
