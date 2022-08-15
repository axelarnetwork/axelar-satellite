import { FC } from "react";
import { SUPPORT_MODAL } from "../../config/constants";
import { useApplicationStateStore } from "../../store";

type SupportProps = {};

export const Support: FC<SupportProps> = ({}) => {
  const { modalId } = useApplicationStateStore((state) => state);

  if (modalId !== SUPPORT_MODAL) return null;

  return (
    <div>
      <h1 className="mb-10 text-3xl">Get Support</h1>
      <p className="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
      <div className="modal-action">
        <label htmlFor={modalId} className="btn">
          Yay!
        </label>
      </div>
    </div>
  );
};
