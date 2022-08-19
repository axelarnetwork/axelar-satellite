import React from "react";
import Image from "next/image";
import {
  FAQ_MODAL,
  GETTING_STARTED_MODAL,
  SUPPORT_MODAL,
  TOS_MODAL,
} from "../../config/constants";
import { useApplicationStateStore } from "../../store";
import { ConnectButton } from "../swap/parts";

export const Navbar = () => {
  const { setModalId } = useApplicationStateStore();

  return (
    <div className="fixed w-full pt-5">
      <nav className="flex items-center justify-between w-full px-4 mx-auto gap-x-10">
        <div className="flex">
          <div className="w-16 h-full">
            <Image
              layout="intrinsic"
              width={50}
              height={50}
              src="/assets/ui/satellite.logo.svg"
            />
          </div>
          <div>
            <div className="text-4xl font-bold">Satellite</div>
            <div className="flex -ml-1">
              <img src="/assets/ui/powered.logo.svg" width={150} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 ml-5">
            <label
              htmlFor={GETTING_STARTED_MODAL}
              className="btn modal-button"
              onClick={() => {
                setModalId(GETTING_STARTED_MODAL);
              }}
            >
              Getting Started
            </label>
            <label
              htmlFor={SUPPORT_MODAL}
              className="btn modal-button"
              onClick={() => {
                setModalId(SUPPORT_MODAL);
              }}
            >
              Support
            </label>
            <label
              htmlFor={FAQ_MODAL}
              className="btn modal-button"
              onClick={() => {
                setModalId(FAQ_MODAL);
              }}
            >
              FAQ
            </label>
            <label
              htmlFor={TOS_MODAL}
              className="btn modal-button"
              onClick={() => {
                setModalId(TOS_MODAL);
              }}
            >
              Terms of Use
            </label>
          </div>
        </div>
        <div className="justify-self-end">
          <ConnectButton />
        </div>
      </nav>
    </div>
  );
};
