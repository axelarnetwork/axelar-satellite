import { AssetConfig } from "@axelar-network/axelarjs-sdk";

export interface NativeAssetConfig extends AssetConfig {
  is_native_asset?: boolean;
}

export const nativeAssets: NativeAssetConfig[] = [
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
  {
    common_key: {
      devnet: "avax-wei",
      testnet: "avax-wei",
      mainnet: "avax-wei",
    },
    is_native_asset: true,
    native_chain: "avalanche",
    fully_supported: true,
    decimals: 18,
    chain_aliases: {
      aura: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.0007,
        ibcDenom:
          "ibc/2991B858634D22E4637F772FA5A5F5BFCE3F30EA3ED208E36DD8DC07330490A9",
        fullDenomPath: "transfer/channel-5/wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      axelar: {
        assetSymbol: "WAVAX",
        assetName: "WAVAX",
        minDepositAmt: 0.0007,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      comdex: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.0007,
        ibcDenom:
          "ibc/2A468AFEDF2B694B46BBE10E9C3631815DF57B3D936462CA031345922A76CD36",
        fullDenomPath: "transfer/channel-18/wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      evmos: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.0007,
        ibcDenom:
          "ibc/2B84B3D7B8AA4B04607ACD2E5096D20B34D6D355D33F4F5DD4659449EB757597",
        fullDenomPath: "transfer/channel-22/wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      fetch: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.0007,
        ibcDenom:
          "ibc/F992067A054C819B42D2DAB57F5CCE347D38352EB90453E59D566BFE64F1614B",
        fullDenomPath: "transfer/channel-6/wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      kujira: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.0007,
        ibcDenom:
          "ibc/C74D5A562B2D54AF03198E5BC6693D16EF978EBA0BD3BA22A7098511B43249CA",
        fullDenomPath: "transfer/channel-8/wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      osmosis: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.0007,
        ibcDenom:
          "ibc/AC114FA5B91B5696ACD80CE7D740E3DEF2C6E76817A9F57754E9423325321220",
        fullDenomPath: "transfer/channel-312/wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      sei: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.0007,
        ibcDenom:
          "ibc/2B1862B1CBE5ABC2E9457A21F2289024853AF12AEF8BC5EF8E4C3FB8B754BE2A",
        fullDenomPath: "transfer/channel-29/wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      aurora: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0xb47BAb33cAE8FCa71FA28516ADCE3AF0B3e040e3",
        // @ts-ignore
        mintLimit: 0,
      },
      avalanche: {
        assetSymbol: "AVAX",
        assetName: "AVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        // @ts-ignore
        mintLimit: 0,
      },
      binance: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x1B29EC62efC689c462b4E0512457175793cEc9e6",
        // @ts-ignore
        mintLimit: 0,
      },
      ethereum: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x72af7e1e7E0D38bCF033C541598F5a0301D051A5",
        // @ts-ignore
        mintLimit: 0,
      },
      fantom: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x8776aDD48553518641a589C39792cc409d4C8B84",
        // @ts-ignore
        mintLimit: 0,
      },
      moonbeam: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x64aae6319934995Bf30e67EBBBA9750256E07283",
        // @ts-ignore
        mintLimit: 0,
      },
      polygon: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x6DD60c05FdA1255A44Ffaa9A8200b5b179A578D6",
        // @ts-ignore
        mintLimit: 0,
      },
    },
  },
];
