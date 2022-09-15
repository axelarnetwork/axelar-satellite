import { AssetConfig } from "@axelar-network/axelarjs-sdk";

export const nativeAssets: AssetConfig[] = [
  {
    common_key: {
      devnet: "eth-wei",
      testnet: "eth-wei",
      mainnet: "eth-wei",
    },
    native_chain: "ethereum",
    fully_supported: true,
    is_native_asset: true,
    decimals: 18,
    chain_aliases: {
      axelar: {
        assetSymbol: "WETH",
        assetName: "WETH",
        minDepositAmt: 0.00002,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "eth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      moonbeam: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00004,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "0xc40Fdaa2cB43C85eAA6D43856df42E7A80669fca",
        // @ts-ignore
        mintLimit: 0,
      },
      fantom: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00004,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "0x930640ef299Bf772f786Cf7E88DA951D76E33168",
        // @ts-ignore
        mintLimit: 0,
      },
      aura: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00002,
        ibcDenom:
          "ibc/E3AB0DFDE9E782262B770C32DF94AC2A92B93DC4825376D6F6C874D3C877864E",
        fullDenomPath: "transfer/channel-5/eth-wei",
        tokenAddress: "eth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      comdex: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00002,
        ibcDenom:
          "ibc/A99459944FD67B5711735B4B4D3FE30BA45328E94D437C78E47CA8DEFA781E49",
        fullDenomPath: "transfer/channel-18/eth-wei",
        tokenAddress: "eth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      evmos: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00002,
        ibcDenom:
          "ibc/9F4A3ADB40D0CB9064EB46C9B57EB69826329478D7D159C4178576801F2B570E",
        fullDenomPath: "transfer/channel-22/eth-wei",
        tokenAddress: "eth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      ethereum: {
        assetSymbol: "ETH",
        assetName: "ETH",
        minDepositAmt: 0.00004,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
                // @ts-ignore
        mintLimit: 0,
      },
      avalanche: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00004,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "0x3613C187b3eF813619A25322595bA5E297E4C08a",
                // @ts-ignore
        mintLimit: 0,
      },
      polygon: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00004,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "0xfba15fFF35558fE2A469B96A90AeD7727FE38fAE",
                // @ts-ignore
        mintLimit: 0,
      },
      binance: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00004,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "0x03Dc012b7851b7D65592Aebc40a6aF9A171E9315",
                // @ts-ignore
        mintLimit: 0,
      },
      aurora: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00004,
        ibcDenom: "eth-wei",
        fullDenomPath: "eth-wei",
        tokenAddress: "0xcfF68Bea15e24aec8ECfdb82862ff776C3e972d1",
                // @ts-ignore
        mintLimit: 0,
      },
      sei: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00002,
        ibcDenom:
          "ibc/C2A89D98873BB55B62CE86700DFACA646EC80352E8D03CC6CF34DD44E46DC75D",
        fullDenomPath: "transfer/channel-29/eth-wei",
        tokenAddress: "eth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      osmosis: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00002,
        ibcDenom:
          "ibc/5D52572B5E1278AC0F5EAAA5D595F7F583981CE403FB8D3850EAA771269575FB",
        fullDenomPath: "transfer/channel-312/eth-wei",
        tokenAddress: "eth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      kujira: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00002,
        ibcDenom:
          "ibc/C567713C9D0904098C14BA0FBEB9192C5B68B590757EE6913DC292710C8926E6",
        fullDenomPath: "transfer/channel-8/eth-wei",
        tokenAddress: "eth-wei",
                // @ts-ignore
        mintLimit: 0,
      },
      fetch: {
        assetSymbol: "WETH",
        assetName: "axlWETH",
        minDepositAmt: 0.00002,
        ibcDenom:
          "ibc/BC8A77AFBD872FDC32A348D3FB10CC09277C266CFE52081DE341C7EC6752E674",
        fullDenomPath: "transfer/channel-6/eth-wei",
        tokenAddress: "eth-wei",
                // @ts-ignore
        mintLimit: 0,
      },
    },
  },
];
