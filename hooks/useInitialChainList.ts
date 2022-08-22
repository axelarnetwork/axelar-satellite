import {
  AssetConfig,
  ChainInfo,
  loadAssets,
  loadChains,
} from "@axelar-network/axelarjs-sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  DEFAULT_ASSET,
  DEFAULT_DEST_CHAIN,
  DEFAULT_SRC_CHAIN,
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
  const { source, destination, asset_denom } = router.query as RouteQuery;

  useEffect(() => {
    Promise.all([loadInitialChains(), loadInitialAssets()]).then(() => {
      // updated query without reloading page
      router.push(
        {
          query: {
            source: source || DEFAULT_SRC_CHAIN,
            destination: destination || DEFAULT_DEST_CHAIN,
            asset_denom: asset_denom || DEFAULT_ASSET,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    });
  }, [router]);

  // TODO: load chains upon project installation
  async function loadInitialChains() {
    return loadChains({ environment }).then((chains) => {
      setAllChains(chains);

      if (source) {
        setSrcChain(
          chains.find(
            (chain) => chain.chainName.toLowerCase() === source
          ) as ChainInfo
        );
      } else {
        setSrcChain(
          chains.find(
            (chain) => chain.chainName.toLowerCase() === DEFAULT_SRC_CHAIN
          ) as ChainInfo
        );
      }

      if (destination) {
        setDestChain(
          chains.find(
            (chain) => chain.chainName.toLowerCase() === destination
          ) as ChainInfo
        );
      } else {
        setDestChain(
          chains.find(
            (chain) => chain.chainName.toLowerCase() === DEFAULT_DEST_CHAIN
          ) as ChainInfo
        );
      }
    });
  }

  async function loadInitialAssets() {
    return loadAssets({ environment }).then((assets: AssetConfig[]) => {
      setAllAssets(assets);

      const assetFound = assets.find((asset) =>
        asset?.common_key[environment].includes(asset_denom)
      );
      if (assetFound) return setAsset(assetFound);

      setAsset(
        assets.find((asset) =>
          asset?.common_key[environment].includes(DEFAULT_ASSET)
        ) as AssetConfig
      );
    });
  }
};
