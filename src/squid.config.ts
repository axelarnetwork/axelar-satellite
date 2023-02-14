import { Squid } from "@0xsquid/sdk";

import { NEXT_PUBLIC_SQUID_URL } from "~/config/constants";

// instantiate the SDK
export const squid: Squid = new Squid({
  baseUrl: NEXT_PUBLIC_SQUID_URL, // for mainnet use "https://api.0xsquid.com"
});

squid.init().catch((e) => console.error("failed to init squid"));

export const getSquidSDK = () =>
  new Promise<Squid>((resolve, reject) => {
    if (squid.initialized) {
      resolve(squid);
    }
    squid
      .init()
      .then(() => resolve(squid))
      .catch((e) => reject(e));
  });
