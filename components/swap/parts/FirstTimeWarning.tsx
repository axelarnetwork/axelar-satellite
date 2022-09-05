import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const FirstTimeWarning = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [showFirstTimeWarning, setShowFirstTimeWarning] = useLocalStorage(
    "showFirstTimeWarning",
    true
  );

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  if (!showFirstTimeWarning) return null;

  return (
    <div className="absolute z-50 w-7/12 mt-24 shadow-lg left-16 alert alert-info">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          viewBox="0 0 24 24"
          className="flex-shrink-0 w-6 h-6 stroke-info"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">New to Satellite?</h3>
          <div className="text-xs">
            Run a few flows in our testnet (with test tokens) and experiment
            here with small amounts first.
          </div>
        </div>
      </div>
      <div className="flex-none">
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setShowFirstTimeWarning(false)}
        >
          Close
        </button>
        <a
          className="btn btn-sm btn-primary"
          href="https://testnet.satellite.money"
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => setShowFirstTimeWarning(false)}
        >
          Go to testnet
        </a>
      </div>
    </div>
  );
};
