import { useEffect } from "react";
import router from "next/router";

import { ENVIRONMENT } from "../config/constants";
import { useSwapStore } from "../store";

export const useNormalizeUrlPaths = () => {
  const { asset, srcChain, destChain, destAddress } = useSwapStore();

  /**
   * UPDATE URL PATHS BASED ON STORE CHANGES
   */
  useEffect(() => {
    if (
      !(
        srcChain?.chainName &&
        destChain?.chainName &&
        asset?.common_key[ENVIRONMENT]
      )
    ) {
      return;
    }
    updateRoutes(
      srcChain.chainName?.toLowerCase(),
      destChain.chainName?.toLowerCase(),
      asset?.common_key[ENVIRONMENT] as string,
      destAddress
    );
  }, [srcChain, destChain, destAddress, asset]);

  function updateRoutes(
    source: string,
    destination: string,
    asset_denom: string,
    destination_address: string
  ) {
    router.push({
      query: {
        ...router.query,
        source,
        destination,
        asset_denom,
        destination_address,
      },
    });
  }
};
