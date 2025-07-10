import { useEffect, useState } from "react";

export const SquidBanner = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex flex-col w-screen sm:w-full md:max-w-[550px] mb-5 z-10 p-4 border-2 border-white border-solid shadow-lg alert bg-base-100/50 backdrop-blur-lg">
      <div>
        <div>
          <h3 className="mb-5 text-xl font-bold">Satellite has been deprecated</h3>
          <div className="text-md">
            For bridging between chains, please use Squid Router powered by Axelar.
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <a
          className="btn btn-xs btn-primary"
          href="https://app.squidrouter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to Squid Router
        </a>
      </div>
    </div>
  );
};
