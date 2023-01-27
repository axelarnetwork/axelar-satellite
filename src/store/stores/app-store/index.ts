import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ApplicationState {
  modalId: string;
}

interface ApplicationStateStore extends ApplicationState {
  setModalId: (state: string) => void;
}

export const useApplicationStateStore = create<ApplicationStateStore>()(
  devtools((set, get) => ({
    modalId: "",
    setModalId: (state) =>
      set(
        {
          modalId: state,
        },
        false,
        "setModalId"
      ),
  }))
);
