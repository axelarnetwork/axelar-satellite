type PoolInfo = {
  pairs: string[];
  dex: string;
  url: string;
};

// only mainnet pools
export const USDC_POOLS: Record<string, PoolInfo> = {
  osmosis: {
    pairs: ["axlUSDC/OSMO"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  polygon: {
    pairs: ["axlUSDC/USDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  linea: {
    pairs: ["axlUSDC/USDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  base: {
    pairs: ["axlUSDC/USDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  // avalanche: {
  //   pairs: ["axlUSDC/USDC"],
  //   dex: "KyberSwap",
  //   url: "https://kyberswap.com/swap/avalanche/axlusdc-to-usdc",
  // },
  fantom: {
    pairs: ["axlUSDC/USDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  terra: {
    pairs: ["axlUSDC/axlUSDT", "axlUSDC/LUNA"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  juno: {
    pairs: ["JUNO/axlUSDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  kujira: {
    pairs: ["axlUSDC/KUJI"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  crescent: {
    pairs: ["bCRE/axlUSDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  evmos: {
    pairs: ["axlUSDC/EVMOS"],
    dex: "Forge",
    url: "https://forge.trade/#/pools",
  },
  aurora: {
    pairs: ["axlUSDC", "USDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  binance: {
    pairs: ["axlUSDC/BUSD"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  arbitrum: {
    pairs: ["axlUSDC/USDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  moonbeam: {
    pairs: ["GLMR/axlUSDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  celo: {
    pairs: ["axlUSDC/cUSD"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  kava: {
    pairs: ["axlUSDC/axlDAI"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
  optimism: {
    pairs: ["axlUSDC/USDC"],
    dex: "Dexscreener",
    url: "https://dexscreener.com/watchlist/LApkQUepeRQc8KbUa9D2",
  },
};
