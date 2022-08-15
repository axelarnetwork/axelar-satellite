import { FC } from "react";
import { useApplicationStateStore } from "../../store";
import { FAQ } from "./FAQ";
import { GettingStarted } from "./GettingStarted";
import { Support } from "./Support";

type ModalWindowProps = {};

export const ModalWindow: FC<ModalWindowProps> = ({}) => {
  const { modalId } = useApplicationStateStore((state) => state);

  return (
    <div>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="cursor-pointer modal">
        <label className="relative modal-box" htmlFor="">
          <GettingStarted />
          <FAQ />
          <Support />
        </label>
      </label>
    </div>
  );
};
