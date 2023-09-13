import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { useSwapStore } from "~/store";

const InfoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="w-5 h-5 pb-1 mx-1 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const SquidBanner = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [showSquidBanner, setShowSquidBanner] = useLocalStorage(
    "showSquidBanner",
    true
  );
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return null;
  }
  if (!showSquidBanner) {
    return null;
  }
  if (srcChain?.module === destChain?.module) {
    return null;
  }

  return (
    <div className="fixed z-50 w-full max-w-screen-2xl top-24 left-10">
      <div className="relative block w-7/12 p-4 border-2 border-white border-solid shadow-lg alert bg-base-100/50 backdrop-blur-lg">
        <button
          className="absolute btn btn-sm btn-circle right-10 top-2"
          onClick={() => setShowSquidBanner(false)}
        >
          Dismiss
        </button>
        <div>
          <div>
            <h3 className="mb-5 text-xl font-bold">Heads up!</h3>
            <div className="text-md">
              Save $$$ in fees: Bridge between EVM and Cosmos chains with Squid
              Router, powered by Axelar.
              <span
                className="cursor-pointer tooltip tooltip-warning"
                data-tip="Satellite uses Deposit Address, an Axelar feature that auto-routes deposits from any chain. Squid uses more gas-efficient logic built with General Message Passing. More info: docs.axelar.dev. "
              >
                {InfoIcon}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <a
            className="mt-5 btn btn-xs btn-primary"
            href="https://app.squidrouter.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Check it out
          </a>
        </div>
      </div>
    </div>
  );
};
