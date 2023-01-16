import create from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  wagmiConnected: boolean;
  keplrConnected: boolean;
  userSelectionForCosmosWallet: "terraStation" | "keplr";
}
const initialWalletState: WalletState = {
  wagmiConnected: false,
  keplrConnected: false,
  userSelectionForCosmosWallet: "keplr",
};

interface WalletStore extends WalletState {
  setWagmiConnected: (state: boolean) => void;
  setKeplrConnected: (state: boolean) => void;
  setUserSelectionForCosmosWallet: (state: "terraStation" | "keplr") => void;
}
export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      ...initialWalletState,
      setWagmiConnected: (wagmiConnected) => set({ wagmiConnected }),
      setKeplrConnected: (keplrConnected) => set({ keplrConnected }),
      setUserSelectionForCosmosWallet: (
        userSelectionForCosmosWallet: "terraStation" | "keplr"
      ) => set({ userSelectionForCosmosWallet }),
    }),
    { name: "walletStore" }
  )
);
