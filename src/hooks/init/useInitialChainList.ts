import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AssetConfig,
  ChainInfo,
  loadAssets,
} from "@axelar-network/axelarjs-sdk";
import { clone, uniq, uniqBy } from "rambda";
import toast from "react-hot-toast";

import {
  ARBITRARY_EVM_ADDRESS,
  DEFAULT_ASSET,
  DEFAULT_DEST_CHAIN,
  DEFAULT_SRC_CHAIN,
  DISABLED_CHAIN_NAMES,
  ENVIRONMENT,
  NATIVE_ASSET_IDS,
  SHOULD_ENABLE_SQUID,
} from "~/config/constants";

import { TokensWithExtendedChainData, useSwapStore } from "~/store";

import {
  AssetAlias,
  AssetConfigExtended,
  ChainInfoExtended,
  RouteQuery,
} from "~/types";
import { loadAllChains } from "~/utils/api";

import { useSquidList } from "./useSquidList";

/**
 * Curried predicate to find a valid chain
 *
 * @param chainName
 */
const isValidChain = (chainName: string) => (chain: ChainInfo) => {
  return (
    chain.chainName?.toLowerCase() === chainName &&
    !DISABLED_CHAIN_NAMES?.includes(chainName?.toLowerCase())
  );
};

/**
 * Curried predicate to find a chain by chain name
 *
 * @param chainName
 * @returns
 */
const byChainName = (chainName: string) => (chain: ChainInfo) =>
  chain.chainName?.toLowerCase() === chainName;

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

  const { squidTokens } = useSquidList();

  const router = useRouter();

  const loadData = useCallback(
    async (squidTokens: TokensWithExtendedChainData[]) => {
      const assets = await loadInitialAssets(squidTokens);

      const chains = await loadInitialChains(squidTokens);

      setDestAddress((router.query?.destination_address as string) || "");

      updateRoutes(
        chains.srcChainName,
        chains.destChainName,
        assets?.assetDenom
      );
      // rehydrateAssets as long as there are no squid tokens
      setRehydrateAssets(!squidTokens.length);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!rehydrateAssets) {
      return;
    }

    loadData(squidTokens);
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

  function injectSquidAssetsIntoChains(
    chains: ChainInfo[],
    squidTokens: TokensWithExtendedChainData[]
  ) {
    if (!SHOULD_ENABLE_SQUID) return chains;
    return chains.map((baseChain) => {
      const chain = baseChain as ChainInfoExtended;
      const relevantSquidTokens = squidTokens.filter(
        (t) => t.chainName.toLowerCase() === chain.id
      );

      if (!relevantSquidTokens.length) {
        return chain;
      }

      for (const squidToken of relevantSquidTokens) {
        const asset =
          // try to find chain asset by address
          chain.assets.find(
            (a) =>
              a.tokenAddress?.toLowerCase() ===
                squidToken.address.toLowerCase() &&
              !NATIVE_ASSET_IDS.includes(a.common_key as string)
          ) ??
          // try to find chain asset by symbol
          chain.assets.find(
            (a) =>
              NATIVE_ASSET_IDS.includes(
                a.assetSymbol?.toLowerCase() as string
              ) && squidToken.address === ARBITRARY_EVM_ADDRESS
          );

        if (asset) {
          asset.isSquidAsset = true;
        }
      }

      return {
        ...chain,
        squidAssets: relevantSquidTokens,
      };
    });
  }

  async function loadInitialChains(squidTokens: TokensWithExtendedChainData[]) {
    const chains = await loadAllChains(ENVIRONMENT).catch((error) => {
      toast.error(
        "Error fetching chain configuration. Please refresh the page."
      );
      throw error;
    });

    const chainsWithUniqueAssets = chains.map((chain) => ({
      ...chain,
      assets: uniqBy((asset) => asset.common_key, chain.assets),
    }));

    const uniqueChains = injectSquidAssetsIntoChains(
      chainsWithUniqueAssets,
      squidTokens
    );

    setAllChains(uniqueChains);

    let { source, destination } = router.query as RouteQuery;
    // handle same srcChain === destChain. eg: moonbeam - moonbeam
    if (source === destination) {
      source = DEFAULT_SRC_CHAIN;
      destination = DEFAULT_DEST_CHAIN;
    }

    let srcChainFound = uniqueChains.find(isValidChain(source));

    let destChainFound = uniqueChains.find(isValidChain(destination));

    /**
     * Handle edge case where srcChain === destChain after default chain setup
     * eg: moonbeam - moonbeamzzz
     */
    if (
      srcChainFound?.chainName?.toLowerCase() === "moobeam" &&
      !destChainFound
    ) {
      destChainFound = uniqueChains.find(byChainName("avalanche"));
    }

    if (
      destChainFound?.chainName?.toLowerCase() === "avalanche" &&
      !srcChainFound
    ) {
      srcChainFound = uniqueChains.find(byChainName("moonbeam"));
    }

    if (srcChainFound) {
      setSrcChain(srcChainFound);
    } else {
      const srcChain = uniqueChains.find(byChainName(DEFAULT_SRC_CHAIN));

      setSrcChain(srcChain as ChainInfo);
    }

    if (destChainFound) {
      setDestChain(destChainFound);
    } else {
      const destChain = uniqueChains.find(byChainName(DEFAULT_DEST_CHAIN));

      setDestChain(destChain as ChainInfo);
    }

    return {
      srcChainName:
        srcChainFound?.chainName?.toLowerCase() || DEFAULT_SRC_CHAIN,
      destChainName:
        destChainFound?.chainName?.toLowerCase() || DEFAULT_DEST_CHAIN,
    };
  }

  function injectSquidAssets(
    allAssets: AssetConfig[],
    squidTokens: TokensWithExtendedChainData[]
  ) {
    if (!SHOULD_ENABLE_SQUID) return allAssets as AssetConfigExtended[];
    const result = clone(allAssets) as AssetConfigExtended[];

    for (const token of squidTokens) {
      const existingAsset = result.find((asset) => {
        const uniqAddresses = uniq(
          Object.values(asset.chain_aliases).map((x) => x.tokenAddress)
        );

        return uniqAddresses.includes(token.address);
      });

      const newAlias: AssetAlias = {
        assetName: token.name,
        assetSymbol: token.symbol,
        tokenAddress: token.address,
        mintLimit: 0,
        minDepositAmt: 0.1,
        fullDenomPath: token.coingeckoId,
        ibcDenom: token.coingeckoId,
        iconSrc: token.logoURI,
        decimals: token.decimals,
      };

      const chainName = token.chainName.toLowerCase();

      if (existingAsset) {
        if (!existingAsset.isSquidAsset) {
          existingAsset.isSquidAsset = true;
        }

        if (!(chainName in existingAsset.chain_aliases)) {
          // adding new chain alias
          existingAsset.chain_aliases[chainName] = {
            ...newAlias,
            addedViaSquid: true,
          };
        }
        if (!existingAsset.chain_aliases[chainName]?.decimals)
          existingAsset.chain_aliases[chainName].decimals = token.decimals;
      } else {
        const assetId = token.coingeckoId || token.symbol.toLocaleLowerCase();
        const newAsset: AssetConfigExtended = {
          id: assetId,
          common_key: {
            [ENVIRONMENT]: assetId,
          },
          chain_aliases: {
            [chainName]: newAlias,
          },
          isSquidAsset: true,
          isSquidOnlyAsset: true,
          is_gas_token: false,
          wrapped_erc20: "",
          fully_supported: true,
          decimals: token.decimals,
          iconSrc: token.logoURI,
          native_chain: chainName,
          gas_token_id: "",
        };

        result.push(newAsset);
      }
    }

    return result;
  }

  async function loadInitialAssets(squidTokens: TokensWithExtendedChainData[]) {
    const assets = await loadAssets({
      environment: ENVIRONMENT,
    });

    const allAssets = injectSquidAssets(assets, squidTokens);

    setAllAssets(allAssets);

    const { asset_denom } = router.query as RouteQuery;
    // if asset not provided get default asset
    if (!asset_denom) {
      const asset = allAssets.find((asset) =>
        asset?.common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
      );
      if (!asset) {
        return;
      }
      setAsset(asset);
      return {
        assetDenom: DEFAULT_ASSET,
      };
    }

    const assetFound = allAssets.find(({ common_key }) =>
      common_key[ENVIRONMENT].includes(asset_denom)
    );

    if (assetFound) {
      setAsset(assetFound);
    } else {
      const asset = allAssets.find(({ common_key }) =>
        common_key[ENVIRONMENT].includes(DEFAULT_ASSET)
      );

      if (!asset) {
        return;
      }

      setAsset(asset);
    }

    return {
      assetDenom: assetFound?.common_key[ENVIRONMENT] || DEFAULT_ASSET,
    };
  }
};
