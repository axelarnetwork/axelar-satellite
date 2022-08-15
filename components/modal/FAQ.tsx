import { FC } from "react";
import { FAQ_MODAL } from "../../config/constants";
import { useApplicationStateStore } from "../../store";

type FAQProps = {};

export const FAQ: FC<FAQProps> = ({}) => {
  
  const { modalId } = useApplicationStateStore((state) => state);

  if (modalId !== FAQ_MODAL) return null;

  return (
    <div>
        <h3 className="text-lg font-bold">
        Congratulations random Internet user! {modalId}
        </h3>
        <p className="py-4">
        You've been selected for a chance to get one year of subscription to
        use Wikipedia for free!
        </p>
        <div className="modal-action">
        <label htmlFor={modalId} className="btn">
            Yay!
        </label>
        </div>
    </div>
  );
};
