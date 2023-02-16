import { FC } from "react";

import { FAQ_MODAL, TOS_MODAL } from "~/config/constants";

import { useApplicationStateStore } from "~/store";

import { FAQ } from "./content/FAQ";
import { GettingStarted } from "./content/GettingStarted";
import { Support } from "./content/Support";
import { TOS } from "./content/TOS";

type ModalWindowProps = {};

export const ModalWindow: FC<ModalWindowProps> = () => {
  const { modalId } = useApplicationStateStore((state) => state);

  return (
    <div>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="cursor-pointer modal">
        <label
          className={`relative modal-box ${
            [TOS_MODAL, FAQ_MODAL].includes(modalId)
              ? "modal-box w-11/12 max-w-5xl"
              : ""
          }`}
          htmlFor=""
        >
          <GettingStarted />
          <FAQ />
          <Support />
          <TOS />
        </label>
      </label>
    </div>
  );
};
