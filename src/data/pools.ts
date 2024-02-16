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
    dex: "QuickSwap",
    url: "https://quickswap.exchange/#/swap?currency0=0x750e4C4984a9e0f12978eA6742Bc1c5D248f40ed[…]ncy1=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359&swapIndex=0",
  },
  linea: {
    pairs: ["axlUSDC/USDC"],
    dex: "PancakeSwap",
    url: "https://pancakeswap.finance/swap?chain=linea&inputCurrency=0xEB466342C4d449BC9f53A865D[…]5&outputCurrency=0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
  },
  base: {
    pairs: ["axlUSDC/USDC"],
    dex: "PancakeSwap",
    url: "https://pancakeswap.finance/swap?chain=base&inputCurrency=0xEB466342C4d449BC9f53A865D5[…]5&outputCurrency=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  // avalanche: {
  //   pairs: ["axlUSDC/USDC"],
  //   dex: "KyberSwap",
  //   url: "https://kyberswap.com/swap/avalanche/axlusdc-to-usdc",
  // },
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
    dex: "Wynd Dex",
    url: "https://app.wynddao.com",
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
    dex: "PancakeSwap",
    url: "https://pancakeswap.finance/swap?inputCurrency=0x4268B8F0B87b6Eae5d897996E6b845ddbD99Adf3&outputCurrency=0x55d398326f99059fF775485246999027B3197955",
  },
  arbitrum: {
    pairs: ["axlUSDC/USDC"],
    dex: "UniSwap",
    url: "https://app.uniswap.org/swap",
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
    dex: "Equilibre",
    url: "https://equilibrefinance.com/swap?outputCurrency=0xeb466342c4d449bc9f53a865d5cb90586f405215",
  },
  optimism: {
    pairs: ["axlUSDC/USDC"],
    dex: "UniSwap",
    url: "https://app.uniswap.org/swap",
  },
};
