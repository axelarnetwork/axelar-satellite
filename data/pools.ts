type PoolInfo = {
  pairs: string[];
  dex: string;
  url: string;
};

// only mainnet pools
export const USDC_POOLS: Record<string, PoolInfo> = {
  osmosis: {
    pairs: ["axlUSDC/OSMO"],
    dex: "Osmosis",
    url: "https://app.osmosis.zone/pool/678",
  },
  polygon: {
    pairs: ["axlUSDC/USDC"],
    dex: "Curve",
    url: "https://curve.fi/#/polygon/swap",
  },
  avalanche: {
    pairs: ["axlUSDC/USDC"],
    dex: "Platypus",
    url: "https://app.platypus.finance/swap?from=axlUSDC&to=USDC",
  },
  fantom: {
    pairs: ["axlUSDC/USDC"],
    dex: "Curve",
    url: "https://curve.fi/#/fantom/pools/factory-v2-85/swap",
  },
  terra: {
    pairs: ["axlUSDC/axlUSDT", "axlUSDC/LUNA"],
    dex: "Astroport",
    url: "https://app.astroport.fi/pools",
  },
  juno: {
    pairs: ["JUNO/axlUSDC"],
    dex: "Junoswap",
    url: "https://junoswap.com/pools/JUNO-USDC",
  },
  kujira: {
    pairs: ["axlUSDC/KUJI"],
    dex: "Kujira Fin",
    url: "https://fin.kujira.app/trade",
  },
  crescent: {
    pairs: ["bCRE/axlUSDC"],
    dex: "Crescent",
    url: "https://app.crescent.network/farm",
  },
  evmos: {
    pairs: ["axlUSDC/EVMOS"],
    dex: "Diffusion",
    url: "https://app.diffusion.fi/#/farm",
  },
  aurora: {
    pairs: ["axlUSDC", "USDC"],
    dex: "Trisolaris",
    url: "https://www.trisolaris.io/#/pool/stable",
  },
  binance: {
    pairs: ["axlUSDC/BUSD"],
    dex: "Ellipsis",
    url: "https://ellipsis.finance/pool/0x6731D8ce7C52FEc9136cf3b7d122C032C46fF58f",
  },
  arbitrum: {
    pairs: ["axlUSDC/USDC"],
    dex: "Curve",
    url: "https://curve.fi/#/arbitrum/pools/factory-v2-64/swap",
  },
  moonbeam: {
    pairs: ["GLMR/axlUSDC"],
    dex: "Stellaswap",
    url: "https://app.stellaswap.com/exchange/swap",
  },
  celo: {
    pairs: ["axlUSDC/cUSD"],
    dex: "Curve",
    url: "https://curve.fi/#/celo/pools/factory-v2-3/swap",
  },
  kava: {
    pairs: ["axlUSDC/axlDAI"],
    dex: "Curve",
    url: "https://curve.fi/#/kava/pools/factory-v2-2/swap",
  },
};
