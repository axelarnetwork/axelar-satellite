import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { ChainInfo, loadAssets } from "@axelar-network/axelarjs-sdk";
import _, { chain } from "lodash";
import toast from "react-hot-toast";

import {
  ARBITRARY_EVM_ADDRESS,
  DEFAULT_ASSET,
  DEFAULT_DEST_CHAIN,
  DEFAULT_SRC_CHAIN,
  DISABLED_CHAIN_NAMES,
  ENVIRONMENT,
  NATIVE_ASSET_IDS,
} from "~/config/constants";

import { useSquidStateStore, useSwapStore } from "~/store";

import { AssetConfigExtended, ChainInfoExtended, RouteQuery } from "~/types";
import { loadAllChains } from "~/utils/api";

import { useSquidList } from "./useSquidList";

const isValidChain = (chainName: string, chain: ChainInfo) => {
  return (
    chain.chainName?.toLowerCase() === chainName &&
    !DISABLED_CHAIN_NAMES?.toLowerCase()
      ?.split(",")
      ?.includes(chainName?.toLowerCase())
  );
};

const hasChainName = (chainName: string, chain: ChainInfo) => {
  return chain.chainName?.toLowerCase() === chainName;
};

export const useInitialChainList = () => {
  const {
    setAllChains,
    setSrcChain,
    setDestChain,
    setAllAssets,
    setAsset,
    rehydrateAssets,
    setRehydrateAssets,
    setDestAddress,
  } = useSwapStore();

  const { squidTokens, setSquidLoaded } = useSquidStateStore();
  useSquidList();

  const router = useRouter();

  const loadData = useCallback(
    async () => {
      console.log("loading initial data");
      const assets = await loadInitialAssets();
      const chains = await loadInitialChains();

      setDestAddress((router.query?.destination_address as string) || "");

      updateRoutes(
        chains.srcChainName,
        chains.destChainName,
        assets?.assetDenom
      );
      setRehydrateAssets(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [squidTokens]
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!rehydrateAssets) {
      return;
    }

    loadData();
  }, [router.isReady, rehydrateAssets, loadData, squidTokens]);

  function updateRoutes(
    source: string,
    destination: string,
    asset_denom?: string
  ) {
    router.push({
      query: {
        ...router.query,
        source,
        destination,
        asset_denom,
      },
    });
  }

  async function injectSquidAssetsIntoChains(chains: ChainInfo[]) {
    const newChains: ChainInfoExtended[] = _.cloneDeep(chains);
    newChains.forEach((chain) => {
      const relevantSquidTokens = squidTokens.filter(
        (t) => t.chainName.toLowerCase() === chain.id
      );
      relevantSquidTokens.forEach((t) => {
        let asset = chain.assets.find(
          (a) =>
            a.tokenAddress?.toLowerCase() === t.address.toLowerCase() &&
            !NATIVE_ASSET_IDS.includes(a.common_key as string)
        );
        //maybe native asset?
        if (!asset) {
          asset = chain.assets.find(
            (a) =>
              NATIVE_ASSET_IDS.includes(
                a.assetSymbol?.toLowerCase() as string
              ) && t.address === ARBITRARY_EVM_ADDRESS
          );
        }
        if (asset) {
          asset.isSquidAsset = true;
        }
      });

      // only add squid assets if there are any
      if (relevantSquidTokens.length) {
        // @ts-ignore
        chain.squidAssets = [relevantSquidTokens];
      }
    });

    setSquidLoaded(true);

    return newChains;
  }

  async function loadInitialChains() {
    const chains = await loadAllChains(ENVIRONMENT).catch((error) => {
      toast.error(
        "Error fetching chain configuration. Please refresh the page."
      );
      throw error;
    });

    const uniqueChains = await injectSquidAssetsIntoChains(
      chains.map((chain) => ({
        ...chain,
        assets: _.uniqBy(chain.assets, (asset) => asset.assetSymbol),
      }))
    );

    setAllChains(uniqueChains);
    let { source, destination } = router.query as RouteQuery;
    // handle same srcChain === destChain. eg: moonbeam - moonbeam
    if (source === destination) {
      source = DEFAULT_SRC_CHAIN;
      destination = DEFAULT_DEST_CHAIN;
    }

    let srcChainFound = uniqueChains.find(isValidChain.bind(null, source));

    let destChainFound = uniqueChains.find(
      isValidChain.bind(null, destination)
    );

    /**
     * Handle edge case where srcChain === destChain after default chain setup
     * eg: moonbeam - moonbeamzzz
     */
    if (
      srcChainFound?.chainName?.toLowerCase() === "moobeam" &&
      !destChainFound
    ) {
      destChainFound = uniqueChains.find(hasChainName.bind(null, "avalanche"));
    }

    if (
      destChainFound?.chainName?.toLowerCase() === "avalanche" &&
      !srcChainFound
    ) {
      srcChainFound = uniqueChains.find(hasChainName.bind(null, "moonbeam"));
    }

    if (srcChainFound) {
      setSrcChain(srcChainFound);
    } else {
      const srcChain = uniqueChains.find(
        hasChainName.bind(null, DEFAULT_SRC_CHAIN)
      );

      setSrcChain(srcChain as ChainInfo);
    }

    if (destChainFound) {
      setDestChain(destChainFound);
    } else {
      const destChain = uniqueChains.find(
        hasChainName.bind(null, DEFAULT_DEST_CHAIN)
      );

      setDestChain(destChain as ChainInfo);
    }

    return {
      srcChainName:
        srcChainFound?.chainName?.toLowerCase() || DEFAULT_SRC_CHAIN,
      destChainName:
        destChainFound?.chainName?.toLowerCase() || DEFAULT_DEST_CHAIN,
    };
  }

  async function loadInitialAssets() {
    const assets = (await loadAssets({
      environment: ENVIRONMENT,
    })) as AssetConfigExtended[];

    setAllAssets(assets);

    const { asset_denom } = router.query as RouteQuery;
    // if asset not provided get default asset
    if (!asset_denom) {
      const _asset = assets.find((asset) =>
        asset?.common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
      );
      if (!_asset) {
        return;
      }
      setAsset(_asset);
      return {
        assetDenom: DEFAULT_ASSET,
      };
    }

    const assetFound = assets.find((asset) =>
      asset?.common_key[ENVIRONMENT].includes(asset_denom)
    );
    if (assetFound) {
      setAsset(assetFound);
    } else {
      const _asset = assets.find((asset) =>
        asset?.common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
      );
      if (!_asset) {
        return;
      }
      setAsset(_asset);
    }

    return {
      assetDenom: assetFound?.common_key[ENVIRONMENT] || DEFAULT_ASSET,
    };
  }
};
