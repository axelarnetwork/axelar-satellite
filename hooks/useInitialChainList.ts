import {
  AssetConfig,
  ChainInfo,
  loadAssets,
  loadChains,
} from "@axelar-network/axelarjs-sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  DEFAULT_ASSET,
  DEFAULT_DEST_CHAIN,
  DEFAULT_SRC_CHAIN,
  DISABLED_CHAIN_NAMES,
  ENVIRONMENT as environment,
} from "../config/constants";
import { useSwapStore } from "../store";

type RouteQuery = {
  source: string;
  destination: string;
  asset_denom: string;
};

export const useInitialChainList = () => {
  const { setAllChains, setSrcChain, setDestChain, setAllAssets, setAsset } =
    useSwapStore();

  const router = useRouter();
  let { source, destination, asset_denom } = router.query as RouteQuery;

  useEffect(() => {
    if (!router.isReady) return;
    Promise.all([loadInitialChains(), loadInitialAssets()]).then(
      ([chains, asset]) => {
        // updated query without reloading page
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            source: chains.srcChainName,
            destination: chains.destChainName,
            asset_denom: asset.assetDenom,
          },
        });
      }
    );
  }, [router.isReady]);

  // TODO: load chains upon project installation
  async function loadInitialChains() {
    return loadChains({ environment }).then((chains) => {
      const sortedChains = chains.sort((a,b) => (a.chainName.localeCompare(b.chainName)));
      const filteredChains = sortedChains.filter(chain => !DISABLED_CHAIN_NAMES.includes(chain.chainName.toLowerCase()))
      setAllChains(filteredChains);

      // handle same srcChain === destChain. eg: moonbeam - moonbeam
      if (source === destination) {
        source = DEFAULT_SRC_CHAIN;
        destination = DEFAULT_DEST_CHAIN;
      }

      let srcChainFound = chains.find(
        (chain) => chain.chainName.toLowerCase() === source
      ) as ChainInfo;
      let destChainFound = chains.find(
        (chain) => chain.chainName.toLowerCase() === destination
      ) as ChainInfo;

      /**
       * Handle edge case where srcChain === destChain after default chain setup
       * eg: moonbeam - moonbeamzzz
       */
      if (
        srcChainFound?.chainName.toLowerCase() === "moobeam" &&
        !destChainFound
      ) {
        destChainFound = chains.find(
          (chain) => chain.chainName.toLowerCase() === "avalanche"
        ) as ChainInfo;
      }

      if (
        destChainFound?.chainName.toLowerCase() === "avalanche" &&
        !srcChainFound
      ) {
        srcChainFound = chains.find(
          (chain) => chain.chainName.toLowerCase() === "moonbeam"
        ) as ChainInfo;
      }

      if (srcChainFound) {
        setSrcChain(srcChainFound);
      } else {
        setSrcChain(
          chains.find(
            (chain) => chain.chainName.toLowerCase() === DEFAULT_SRC_CHAIN
          ) as ChainInfo
        );
      }

      if (destChainFound) {
        setDestChain(destChainFound);
      } else {
        setDestChain(
          chains.find(
            (chain) => chain.chainName.toLowerCase() === DEFAULT_DEST_CHAIN
          ) as ChainInfo
        );
      }

      return {
        srcChainName:
          srcChainFound?.chainName?.toLowerCase() || DEFAULT_SRC_CHAIN,
        destChainName:
          destChainFound?.chainName?.toLowerCase() || DEFAULT_DEST_CHAIN,
      };
    });
  }

  async function loadInitialAssets() {
    return loadAssets({ environment }).then((assets: AssetConfig[]) => {
      setAllAssets(assets);

      const assetFound = assets.find((asset) =>
        asset?.common_key[environment].includes(asset_denom)
      );
      if (assetFound) {
        setAsset(assetFound);
      } else {
        setAsset(
          assets.find((asset) =>
            asset?.common_key[environment].includes(DEFAULT_ASSET)
          ) as AssetConfig
        );
      }

      return {
        assetDenom: assetFound?.common_key[environment] || DEFAULT_ASSET,
      };
    });
  }
};
