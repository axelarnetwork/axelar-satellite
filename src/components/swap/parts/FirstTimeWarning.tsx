import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { makeAccessibleKeysHandler } from "~/utils/react";

export const FirstTimeWarning = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [showFirstTimeWarning, setShowFirstTimeWarning] = useLocalStorage(
    "showFirstTimeWarning",
    true
  );

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return null;
  }
  if (!showFirstTimeWarning) {
    return null;
  }

  return (
    <div className="fixed z-50 w-full max-w-screen-md bottom-10 left-10">
      <div className="relative block w-7/12 p-4 shadow-lg alert bg-base-100/50 backdrop-blur-lg">
        <button
          className="absolute btn btn-sm btn-circle right-2 top-2"
          onClick={() => setShowFirstTimeWarning(false)}
        >
          ✕
        </button>
        <div>
          <div>
            <h3 className="mb-2 text-lg font-bold">New to Satellite?</h3>
            <div className="text-xs">
              Run a few flows in our testnet (with test tokens) and experiment
              here with small amounts first.
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <a
            className="mt-5 btn btn-xs btn-primary"
            href="https://testnet.satellite.money"
            rel="noopener noreferrer"
            target="_blank"
            {...makeAccessibleKeysHandler(
              setShowFirstTimeWarning.bind(null, false)
            )}
          >
            Go to testnet
          </a>
        </div>
      </div>
    </div>
  );
};
