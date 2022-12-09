import {
  AssetConfig,
  AssetInfo,
  ChainInfo,
  loadAssets,
  loadChains,
} from "@axelar-network/axelarjs-sdk";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  DEFAULT_ASSET,
  DEFAULT_DEST_CHAIN,
  DEFAULT_SRC_CHAIN,
  DISABLED_CHAIN_NAMES,
  ENVIRONMENT,
  ENVIRONMENT as environment,
} from "../config/constants";
import { nativeAssets } from "../config/nativeAssetList/testnet";
import { useSwapStore } from "../store";

type RouteQuery = {
  source: string;
  destination: string;
  asset_denom: string;
};

export const useInitialChainList = () => {
  const {
    allAssets,
    setAllChains,
    setSrcChain,
    setDestChain,
    setAllAssets,
    asset,
    setAsset,
    srcChain,
    destChain,
    destAddress,
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
            asset.assetDenom,
            (router.query.destination_address as string) || ""
          );
        })
        .then(() => {
          setRehydrateAssets(false);
        });
    }
  }, [router.isReady, rehydrateAssets]);

  // useEffect(() => {
  //   if (
  //     !srcChain?.chainName ||
  //     !destChain?.chainName ||
  //     !asset?.common_key[ENVIRONMENT]
  //   )
  //     return;
  //   updateRoutes(
  //     srcChain.chainName.toLowerCase(),
  //     destChain.chainName.toLowerCase(),
  //     asset?.common_key[ENVIRONMENT] as string,
  //     destAddress
  //   );
  // }, [srcChain, destChain, destAddress, asset]);

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

  // TODO: load chains upon project installation
  async function loadInitialChains() {
    return loadChains({ environment }).then((chains) => {
      function updateChainAssets(chainInfo: ChainInfo) {
        const filteredAssetList: AssetConfig[] =
          ENVIRONMENT === "testnet" ? nativeAssets : [];

        const assetsList: AssetInfo[] = [];

        filteredAssetList.forEach((asset) => {
          const assetToPush: AssetInfo = cloneDeep(
            asset.chain_aliases[chainInfo.chainName.toLowerCase()]
          );
          if (!assetToPush) return;
          assetToPush.common_key = asset.common_key[ENVIRONMENT];
          assetToPush.native_chain = asset.native_chain;
          assetToPush.decimals = asset.decimals;
          assetToPush.fullySupported = asset.fully_supported;
          assetsList.push(assetToPush);
        });

        // console.log("udpated assets list",assetsList);

        return assetsList;
      }
      const sortedChains = chains.sort((a, b) =>
        a.chainName.localeCompare(b.chainName)
      );
      const filteredChains = sortedChains.filter((chain) => {
        const splitChainNames = DISABLED_CHAIN_NAMES.split(",");
        // console.log({
        //   splitChainNames,
        //   "!splitChainNames.find((c) => c === (chain as any).id)":
        //     !splitChainNames.find((c) => c === (chain as any).id),
        // });
        return !splitChainNames.find((c) => c === (chain as any).id);
        // !DISABLED_CHAIN_NAMES.split(',').includes(chain.chainName.toLowerCase())
      });
      filteredChains.forEach((chain) => {
        chain.assets = [
          ...updateChainAssets(chain),
          ...(chain.assets as AssetInfo[]),
        ];
      });

      setAllChains(filteredChains);

      let { source, destination } = router.query as RouteQuery;

      // handle same srcChain === destChain. eg: moonbeam - moonbeam
      if (source === destination) {
        source = DEFAULT_SRC_CHAIN;
        destination = DEFAULT_DEST_CHAIN;
      }

      let srcChainFound = chains.find(
        (chain) =>
          chain.chainName.toLowerCase() === source &&
          !DISABLED_CHAIN_NAMES.split(",").find((c) => c === (chain as any).id)
        // !DISABLED_CHAIN_NAMES.toLowerCase().includes(source.toLowerCase())
      ) as ChainInfo;
      let destChainFound = chains.find(
        (chain) =>
          chain.chainName.toLowerCase() === destination &&
          !DISABLED_CHAIN_NAMES.split(",").find((c) => c === (chain as any).id)
        // !DISABLED_CHAIN_NAMES.toLowerCase().includes(
        //   destination.toLowerCase()
        // )
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
      const assetsWithNative = [...nativeAssets, ...assets];
      setAllAssets(assetsWithNative);

      const { asset_denom } = router.query as RouteQuery;

      // if asset not provided get default asset
      if (!asset_denom) {
        setAsset(
          assetsWithNative.find((asset) =>
            asset?.common_key[environment].includes(DEFAULT_ASSET)
          ) as AssetConfig
        );
        return {
          assetDenom: DEFAULT_ASSET,
        };
      }

      const assetFound = assetsWithNative.find((asset) =>
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
