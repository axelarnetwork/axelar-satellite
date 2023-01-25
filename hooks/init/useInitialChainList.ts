import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import {
  AssetConfig,
  AssetInfo,
  ChainInfo,
  loadAssets,
} from "@axelar-network/axelarjs-sdk";

import { useSquidStateStore, useSwapStore } from "../../store";

import { useSquidList } from "hooks/init/useSquidList";
import _ from "lodash";
import toast from "react-hot-toast";
import { squid } from "squid.config";

import {
  DEFAULT_ASSET,
  DEFAULT_DEST_CHAIN,
  DEFAULT_SRC_CHAIN,
  DISABLED_CHAIN_NAMES,
  ENVIRONMENT,
} from "../../config/constants";
import { AssetConfigExtended, RouteQuery } from "../../types";
import { addNativeAssets, loadAllChains } from "../../utils/api";

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

  useSquidList();
  const { squidChains, squidTokens, squidLoaded, setSquidLoaded } =
    useSquidStateStore();

  const router = useRouter();

  const loadData = useCallback(async () => {
    if (squidTokens?.length === 0) return;
    const chains = await loadInitialChains();
    const assets = await loadInitialAssets();

    setDestAddress((router.query?.destination_address as string) || "");

    updateRoutes(chains.srcChainName, chains.destChainName, assets?.assetDenom);
    setRehydrateAssets(false);
    // eslint-disable-next-line
  }, [squidTokens]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!rehydrateAssets) return;

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

  async function injectSquidAssets(chains: ChainInfo[]) {
    // if (!squidTokens || squidTokens.length === 0 || squidLoaded) {
    //   return chains;
    // }
    const newChains: ChainInfo[] = _.cloneDeep(chains);
    newChains.forEach((chain) => {
      const relevantSquidTokens = squidTokens.filter(
        (t) => t.chainName.toLowerCase() === chain.id
      );
      relevantSquidTokens.forEach((t) => {
        const asset = chain.assets.find(
          (a) => a.tokenAddress?.toLowerCase() === t.address.toLowerCase()
        );
        // @ts-ignore
        if (asset) asset.isSquidAsset = true;
      });
      // @ts-ignore
      chain.squidAssets = [relevantSquidTokens];
    });
    // console.log("new chains", newChains);

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
    const uniqueChains = await injectSquidAssets(
      chains.map((_chain) => {
        _chain.assets = _.uniqBy(_chain.assets, (_asset) => _asset.assetSymbol);
        return _chain;
      })
    );
    debugger;
    console.log("uique chains", uniqueChains, squidTokens);

    setAllChains(uniqueChains);
    let { source, destination } = router.query as RouteQuery;
    // handle same srcChain === destChain. eg: moonbeam - moonbeam
    if (source === destination) {
      source = DEFAULT_SRC_CHAIN;
      destination = DEFAULT_DEST_CHAIN;
    }
    let srcChainFound = uniqueChains.find(
      (chain) =>
        chain.chainName?.toLowerCase() === source &&
        !DISABLED_CHAIN_NAMES?.toLowerCase().includes(source?.toLowerCase())
    ) as ChainInfo;
    let destChainFound = uniqueChains.find(
      (chain) =>
        chain.chainName?.toLowerCase() === destination &&
        !DISABLED_CHAIN_NAMES?.toLowerCase().includes(
          destination?.toLowerCase()
        )
    ) as ChainInfo;
    /**
     * Handle edge case where srcChain === destChain after default chain setup
     * eg: moonbeam - moonbeamzzz
     */
    if (
      srcChainFound?.chainName?.toLowerCase() === "moobeam" &&
      !destChainFound
    ) {
      destChainFound = uniqueChains.find(
        (chain) => chain.chainName?.toLowerCase() === "avalanche"
      ) as ChainInfo;
    }
    if (
      destChainFound?.chainName?.toLowerCase() === "avalanche" &&
      !srcChainFound
    ) {
      srcChainFound = uniqueChains.find(
        (chain) => chain.chainName?.toLowerCase() === "moonbeam"
      ) as ChainInfo;
    }
    if (srcChainFound) {
      setSrcChain(srcChainFound);
    } else {
      setSrcChain(
        uniqueChains.find(
          (chain) => chain.chainName?.toLowerCase() === DEFAULT_SRC_CHAIN
        ) as ChainInfo
      );
    }
    if (destChainFound) {
      setDestChain(destChainFound);
    } else {
      setDestChain(
        uniqueChains.find(
          (chain) => chain.chainName?.toLowerCase() === DEFAULT_DEST_CHAIN
        ) as ChainInfo
      );
    }
    return {
      srcChainName:
        srcChainFound?.chainName?.toLowerCase() || DEFAULT_SRC_CHAIN,
      destChainName:
        destChainFound?.chainName?.toLowerCase() || DEFAULT_DEST_CHAIN,
    };
  }

  async function loadInitialAssets() {
    const a = await loadAssets({ environment: ENVIRONMENT });
    const assets = a as AssetConfigExtended[];
    // if (!squidLoaded) {
    //   await injectSquidAssets();
    //   setSquidLoaded(true);
    // }
    setAllAssets(assets);

    const { asset_denom } = router.query as RouteQuery;
    // if asset not provided get default asset
    if (!asset_denom) {
      const _asset = assets.find((asset) =>
        asset?.common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
      );
      if (!_asset) return;
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
      if (!_asset) return;
      setAsset(_asset);
    }

    return {
      assetDenom: assetFound?.common_key[ENVIRONMENT] || DEFAULT_ASSET,
    };
  }

  // async function loadInitialAssets() {
  //   return loadAssets({ environment: ENVIRONMENT }).then((a) => {
  //     console.log(
  //       "squid tokens in loadInitialAssets",
  //       squidChains,
  //       squidTokens
  //     );
  //     const assets = a as AssetConfigExtended[];
  //     setAllAssets(assets);

  //     const { asset_denom } = router.query as RouteQuery;
  //     // if asset not provided get default asset
  //     if (!asset_denom) {
  //       const _asset = assets.find((asset) =>
  //         asset?.common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
  //       );
  //       if (!_asset) return;
  //       setAsset(_asset);
  //       return {
  //         assetDenom: DEFAULT_ASSET,
  //       };
  //     }

  //     const assetFound = assets.find((asset) =>
  //       asset?.common_key[ENVIRONMENT].includes(asset_denom)
  //     );
  //     if (assetFound) {
  //       setAsset(assetFound);
  //     } else {
  //       const _asset = assets.find((asset) =>
  //         asset?.common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
  //       );
  //       if (!_asset) return;
  //       setAsset(_asset);
  //     }

  //     return {
  //       assetDenom: assetFound?.common_key[ENVIRONMENT] || DEFAULT_ASSET,
  //     };
  //   });
  // }
};
