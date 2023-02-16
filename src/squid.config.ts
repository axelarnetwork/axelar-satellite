import { Squid } from "@0xsquid/sdk";

import { NEXT_PUBLIC_SQUID_URL } from "~/config/constants";

// instantiate the SDK
export const squid: Squid = new Squid({
  baseUrl: NEXT_PUBLIC_SQUID_URL, // for mainnet use "https://api.0xsquid.com"
});

export const getSquidSDK = () => {
  console.log("getSquidSDK", { squid: squid.tokens.length });
  return new Promise<Squid>((resolve, reject) => {
    if (squid.initialized) {
      resolve(squid);
    }
    squid
      .init()
      .then(() => {
        console.info("[squid initialized]", squid.tokens.length);
        resolve(squid);
      })
      .catch((e) => reject(e));
  });
};
