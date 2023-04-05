import React from "react";
import Image from "next/image";

import {
  FAQ_MODAL,
  GETTING_STARTED_MODAL,
  SUPPORT_MODAL,
  TOS_MODAL,
} from "~/config/constants";

import { useApplicationStateStore } from "~/store";

import { withAccessibleKeysHandler } from "~/utils/react";

import { ConnectButton } from "../swap/parts";

const SatelliteLogo = () => {
  return (
    <div>
      <div className="relative flex items-center">
        <div className="relative flex items-center w-11 h-11">
          <Image
            fill
            src="/assets/ui/satellite.logo.svg"
            alt="Satellite Logo"
          />
        </div>
        <div className="relative ml-4">
          <div className="text-4xl font-bold">Satellite</div>
          <div className="absolute">
            <a href="https://axelar.network">
              <Image
                className="ml-3"
                src="/assets/ui/powered.logo.svg"
                width={150}
                height={30}
                alt="Powered by Axelar"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const NAV_ITEMS = [
  {
    id: GETTING_STARTED_MODAL,
    label: "Getting Started",
  },
  {
    id: SUPPORT_MODAL,
    label: "Support",
  },
  {
    id: FAQ_MODAL,
    label: "FAQ",
  },
  {
    id: "pools",
    label: "Pools",
    type: "link",
    href: "https://axelar.network/blog/liquidity-pools-for-bridged-assets-via-axelar",
  },
  {
    id: TOS_MODAL,
    label: "Terms of Use",
  },
];

type NavItemProps = (typeof NAV_ITEMS)[number] & {
  onModalIdChange: (id: string) => void;
};

const NavItem: React.FC<NavItemProps> = (props) => {
  if (props.type === "link") {
    return (
      <a
        key={props.id}
        href={props.href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn btn-link modal-button"
      >
        {props.label}
      </a>
    );
  }

  const handler = props.onModalIdChange.bind(null, props.id);

  return (
    <label
      role="button"
      key={props.id}
      htmlFor={props.id}
      className="btn btn-link modal-button"
      onClick={handler}
      onKeyDown={withAccessibleKeysHandler(handler)}
    >
      {props.label}
    </label>
  );
};

export const Navbar = () => {
  const { setModalId } = useApplicationStateStore();

  return (
    <div className="fixed w-full pt-5">
      <nav className="container flex items-center justify-between w-full px-4 mx-auto gap-x-5">
        <div className="flex w-full">
          <SatelliteLogo />

          <div className="flex items-center w-full ml-10">
            <div className="hidden space-x-2 lg:block">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.id} {...item} onModalIdChange={setModalId} />
              ))}
            </div>
            <div className="ml-auto justify-self-end">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
