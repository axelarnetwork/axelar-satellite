import { FC } from "react";
import { TOS_MODAL } from "../../config/constants";
import { useApplicationStateStore } from "../../store";
import { FAQ } from "./FAQ";
import { GettingStarted } from "./GettingStarted";
import { Support } from "./Support";
import { TOS } from "./TOS";

type ModalWindowProps = {};

export const ModalWindow: FC<ModalWindowProps> = ({}) => {
  const { modalId } = useApplicationStateStore((state) => state);

  return (
    <div>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="cursor-pointer modal">
        <label className={`relative modal-box ${modalId === TOS_MODAL ? "modal-box w-11/12 max-w-5xl" : ""}`} htmlFor="">
          <GettingStarted />
          <FAQ />
          <Support />
          <TOS />
        </label>
      </label>
    </div>
  );
};
