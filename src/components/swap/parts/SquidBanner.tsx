import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { useSwapStore } from "~/store";

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
    <div className="fixed z-50 w-full max-w-screen-xl top-24 left-10">
      <div className="relative block w-7/12 p-4 border-2 border-white border-solid shadow-lg alert bg-base-100/50 backdrop-blur-lg">
        <button
          className="absolute btn btn-sm btn-circle right-10 top-2"
          onClick={() => setShowSquidBanner(false)}
        >
          Dismiss
        </button>
        <div>
          <div>
            <h3 className="mb-2 text-lg font-bold">Heads up!</h3>
            <div className="text-xs">
              Save $$$ in fees: Bridge between EVM and Cosmos chains with Squid
              Router, powered by Axelar.
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
