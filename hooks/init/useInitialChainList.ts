import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  AssetConfig,
  ChainInfo,
  loadAssets,
} from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "../../store";

import _ from "lodash";
import toast from "react-hot-toast";

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
  } = useSwapStore();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (rehydrateAssets) {
      Promise.all([loadInitialChains(), loadInitialAssets()])
        .then(([chains, asset]) => {
          updateRoutes(
            chains.srcChainName,
            chains.destChainName,
            asset?.assetDenom || "",
            (router.query.destination_address as string) || ""
          );
        })
        .then(() => {
          setRehydrateAssets(false);
        });
    }
    // eslint-disable-next-line
  }, [router.isReady, rehydrateAssets]);

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

  async function loadInitialChains() {
    // load chains with native assets
    const chains = await loadAllChains(ENVIRONMENT)
      .then((_chains) => {
        _chains.map((_chain) => {
          _chain.assets = _.uniqBy(
            _chain.assets,
            (_asset) => _asset.assetSymbol
          );
          return _chain;
        });
        return _chains;
      })
      // .then((_chains) => addNativeAssets(_chains, nativeAssets, ENVIRONMENT))
      .then((_chains) => setAllChains(_chains))
      .catch((error) => {
        toast.error(
          "Error fetching chain configuration. Please refresh the page."
        );
        throw error;
      });

    let { source, destination } = router.query as RouteQuery;

    // handle same srcChain === destChain. eg: moonbeam - moonbeam
    if (source === destination) {
      source = DEFAULT_SRC_CHAIN;
      destination = DEFAULT_DEST_CHAIN;
    }

    let srcChainFound = chains.find(
      (chain) =>
        chain.chainName?.toLowerCase() === source &&
        !DISABLED_CHAIN_NAMES?.toLowerCase().includes(source?.toLowerCase())
    ) as ChainInfo;
    let destChainFound = chains.find(
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
      destChainFound = chains.find(
        (chain) => chain.chainName?.toLowerCase() === "avalanche"
      ) as ChainInfo;
    }

    if (
      destChainFound?.chainName?.toLowerCase() === "avalanche" &&
      !srcChainFound
    ) {
      srcChainFound = chains.find(
        (chain) => chain.chainName?.toLowerCase() === "moonbeam"
      ) as ChainInfo;
    }

    if (srcChainFound) {
      setSrcChain(srcChainFound);
    } else {
      setSrcChain(
        chains.find(
          (chain) => chain.chainName?.toLowerCase() === DEFAULT_SRC_CHAIN
        ) as ChainInfo
      );
    }

    if (destChainFound) {
      setDestChain(destChainFound);
    } else {
      setDestChain(
        chains.find(
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
    return loadAssets({ environment: ENVIRONMENT }).then((a) => {
      const assets = a as AssetConfigExtended[];
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
    });
  }
};
