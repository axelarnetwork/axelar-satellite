import { AssetConfig } from "@axelar-network/axelarjs-sdk";

export interface NativeAssetConfig extends AssetConfig {
  is_native_asset?: boolean;
}

export const nativeAssets: NativeAssetConfig[] = [
  // {
  //   common_key: {
  //     devnet: "eth-wei",
  //     testnet: "eth-wei",
  //     mainnet: "eth-wei",
  //   },
  //   native_chain: "ethereum",
  //   fully_supported: true,
  //   is_native_asset: true,
  //   decimals: 18,
  //   chain_aliases: {
  //     axelar: {
  //       assetSymbol: "WETH",
  //       assetName: "WETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //     moonbeam: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00004,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "0xc40Fdaa2cB43C85eAA6D43856df42E7A80669fca",
  //       // @ts-ignore
  //
  //     },
  //     fantom: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00004,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "0x930640ef299Bf772f786Cf7E88DA951D76E33168",
  //       // @ts-ignore
  //
  //     },
  //     aura: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom:
  //         "ibc/E3AB0DFDE9E782262B770C32DF94AC2A92B93DC4825376D6F6C874D3C877864E",
  //       fullDenomPath: "transfer/channel-5/eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //     comdex: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom:
  //         "ibc/A99459944FD67B5711735B4B4D3FE30BA45328E94D437C78E47CA8DEFA781E49",
  //       fullDenomPath: "transfer/channel-18/eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //     evmos: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom:
  //         "ibc/9F4A3ADB40D0CB9064EB46C9B57EB69826329478D7D159C4178576801F2B570E",
  //       fullDenomPath: "transfer/channel-22/eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //     ethereum: {
  //       assetSymbol: "ETH",
  //       assetName: "ETH",
  //       minDepositAmt: 0.00004,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  //       // @ts-ignore
  //
  //     },
  //     avalanche: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00004,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "0x3613C187b3eF813619A25322595bA5E297E4C08a",
  //       // @ts-ignore
  //
  //     },
  //     polygon: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00004,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "0xfba15fFF35558fE2A469B96A90AeD7727FE38fAE",
  //       // @ts-ignore
  //
  //     },
  //     binance: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00004,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "0x03Dc012b7851b7D65592Aebc40a6aF9A171E9315",
  //       // @ts-ignore
  //
  //     },
  //     aurora: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00004,
  //       ibcDenom: "eth-wei",
  //       fullDenomPath: "eth-wei",
  //       tokenAddress: "0xcfF68Bea15e24aec8ECfdb82862ff776C3e972d1",
  //       // @ts-ignore
  //
  //     },
  //     sei: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom:
  //         "ibc/C2A89D98873BB55B62CE86700DFACA646EC80352E8D03CC6CF34DD44E46DC75D",
  //       fullDenomPath: "transfer/channel-29/eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //     osmosis: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom:
  //         "ibc/5D52572B5E1278AC0F5EAAA5D595F7F583981CE403FB8D3850EAA771269575FB",
  //       fullDenomPath: "transfer/channel-312/eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //     kujira: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom:
  //         "ibc/C567713C9D0904098C14BA0FBEB9192C5B68B590757EE6913DC292710C8926E6",
  //       fullDenomPath: "transfer/channel-8/eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //     fetch: {
  //       assetSymbol: "WETH",
  //       assetName: "axlWETH",
  //       minDepositAmt: 0.00002,
  //       ibcDenom:
  //         "ibc/BC8A77AFBD872FDC32A348D3FB10CC09277C266CFE52081DE341C7EC6752E674",
  //       fullDenomPath: "transfer/channel-6/eth-wei",
  //       tokenAddress: "eth-wei",
  //       // @ts-ignore
  //
  //     },
  //   },
  // },
  {
    common_key: {
      devnet: "dev-wei",
      testnet: "dev-wei",
      mainnet: "glmr-wei",
    },
    is_native_asset: true,
    native_chain: "moonbeam",
    fully_supported: true,
    decimals: 18,
    chain_aliases: {
      aura: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/CF03353110E55C2E4D952D0DF4542AE8443CF5FA7023EB572B4A863DFB61EBA2",
        fullDenomPath: "transfer/channel-5/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      axelar: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "wdev-wei",
      },
      comdex: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/D61CC4FC3429D6DA8B48667938DA1C94C29B01BA6873F97E6B07D6574321E181",
        fullDenomPath: "transfer/channel-18/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      evmos: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/4F89D2416F2E2CF9CFE68CE8B77A11A07B4F590B13E410DA86B1A5E6BCBDA24B",
        fullDenomPath: "transfer/channel-22/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      fetch: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/42ABF9E931A230BB249FE1F51F67C5E8C3D69FD756DB8D91D5DBED16170C2DF8",
        fullDenomPath: "transfer/channel-6/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      kujira: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/25C4852211900E04B162241362DB1F1D9B7939875A038913E56C9FEF66EA9AD6",
        fullDenomPath: "transfer/channel-8/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      osmosis: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/400AF92417EE60F72C56B8E128A19AAC991DC46FF3A00F198FB47FB93D93AF2D",
        fullDenomPath: "transfer/channel-312/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      sei: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/DF0CB572FFA519B1AA2DEE4A396FBAADE373B5ABB76CF5BD33E0619612B60B38",
        fullDenomPath: "transfer/channel-29/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      terra: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.02,
        ibcDenom:
          "ibc/4F89D2416F2E2CF9CFE68CE8B77A11A07B4F590B13E410DA86B1A5E6BCBDA24B",
        fullDenomPath: "transfer/channel-22/wdev-wei",
        tokenAddress: "wdev-wei",
      },
      aurora: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.04,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "0xC43178D657171A831d826f01ECa657c9439457c6",
      },
      avalanche: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.04,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "0xF58537d9061f7257e44442Fb7870A094AAE92B43",
      },
      binance: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.04,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "0xa893Fd868c3159B294f6416F512203be53315fd8",
      },
      ethereum: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.04,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "0x4B13D583F45Aa01fb2bE18a7AAfE14DE183B1Ac9",
      },
      fantom: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.04,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "0xD6f858A1E75e9a06c42dcd86BB876C5E9FccA572",
      },
      moonbeam: {
        assetSymbol: "DEV",
        assetName: "DEV",
        minDepositAmt: 0.04,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "0x1436aE0dF0A8663F18c0Ec51d7e2E46591730715",
      },
      polygon: {
        assetSymbol: "WDEV",
        assetName: "WDEV",
        minDepositAmt: 0.04,
        ibcDenom: "wdev-wei",
        fullDenomPath: "wdev-wei",
        tokenAddress: "0xb6a2f51C219A66866263Cb18DD41EE6C51B464cB",
      },
    },
  },
  {
    common_key: {
      devnet: "ftm-wei",
      testnet: "ftm-wei",
      mainnet: "ftm-wei",
    },
    is_native_asset: true,
    native_chain: "fantom",
    fully_supported: true,
    decimals: 18,
    chain_aliases: {
      aura: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/BB68A322BA69ED1661EA38363B6A6D06D27AD205896875E78EA225AAF3A65CA6",
        fullDenomPath: "transfer/channel-5/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      axelar: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "wftm-wei",
      },
      comdex: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/48D9332743BEBDD4247DEE7AA805DFBE57F0F7302D381F6EF36E29E530CE7AB6",
        fullDenomPath: "transfer/channel-18/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      evmos: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/F2D6753B652120212D09EE59075F0D820FCF580620DA8D3DE0349B614ED69A2B",
        fullDenomPath: "transfer/channel-22/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      fetch: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/19E687E77D1AE3CADBB3DE487277AFEC0E340A84334D6ED3F216EF25A7075746",
        fullDenomPath: "transfer/channel-6/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      kujira: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/C2BA0743260DDCD9B2E5464860584E2F0826E7C021E19B16A9F5CEF29D225CD3",
        fullDenomPath: "transfer/channel-8/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      osmosis: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/DBD032174320882A939AD78C20A29F98EBAC9F83C28127A387B2D2657C7EC21F",
        fullDenomPath: "transfer/channel-312/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      sei: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/55E9FAD184A9FE483EEA63FD0DDBADFDED7F2A062B6329224F81CAAC722B6401",
        fullDenomPath: "transfer/channel-29/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      terra: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.04,
        ibcDenom:
          "ibc/F2D6753B652120212D09EE59075F0D820FCF580620DA8D3DE0349B614ED69A2B",
        fullDenomPath: "transfer/channel-22/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      aurora: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.08,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0x0660F60B6cC54a3E1e526113a1D25d516273AF3E",
      },
      avalanche: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.08,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0xeF721BaBf08A2eE5BCcfd2f2A34CbF4Dc9A56959",
      },
      binance: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.08,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0x90dEcD89a744a0CFbB3cc8DE08A5f3B14875B6C4",
      },
      ethereum: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.08,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0x594D8b81eC765410536ab59E98091700b99508D8",
      },
      fantom: {
        assetSymbol: "FTM",
        assetName: "FTM",
        minDepositAmt: 0.08,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0x812666209b90344Ec8e528375298ab9045c2Bd08",
      },
      moonbeam: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.08,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0x40EebD34eC6CB4C0644a18494365171b1dcE97eb",
      },
      polygon: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 0.08,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0x62b6F2A4eE6a4801bfcD2056d19c6d71654D2582",
      },
    },
  },
  {
    common_key: {
      devnet: "matic-wei",
      testnet: "matic-wei",
      mainnet: "matic-wei",
    },
    is_native_asset: true,
    native_chain: "polygon",
    fully_supported: true,
    decimals: 18,
    chain_aliases: {
      aura: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/E97CB9081D7EB7CAEAE022E448FDEF6D1D0781B63DA4112CAE50285594B2B32C",
        fullDenomPath: "transfer/channel-5/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      axelar: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      comdex: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/91ECD9DBAB30E311D472280D724334F26989748BA176FD66E5160CE1F1543360",
        fullDenomPath: "transfer/channel-18/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      evmos: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/8DE781194A674B7129D9EFA838F3E50B5F50212995AA825634BF702E0D037AC3",
        fullDenomPath: "transfer/channel-22/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      fetch: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/14E4FD1AB72DE9BF1D6725CBA18373C406CB9A7DA17955299F3F4DC5C6131A4E",
        fullDenomPath: "transfer/channel-6/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      kujira: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/91C6798C23EE6AD5B8336C247371546FFA0026854162612EA4EBC80C62A2841C",
        fullDenomPath: "transfer/channel-8/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      osmosis: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/528CE04E9CA727529411F4E6D1080C59C4ACFEAEECC453E4250639A8F6648496",
        fullDenomPath: "transfer/channel-312/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      sei: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/945B918E535DCCA5EA4B94FC65589787572C8D2B06E5F9C8927F3FA94AE8EB5F",
        fullDenomPath: "transfer/channel-29/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      terra: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/8DE781194A674B7129D9EFA838F3E50B5F50212995AA825634BF702E0D037AC3",
        fullDenomPath: "transfer/channel-22/wmatic-wei",
        tokenAddress: "wmatic-wei",
      },
      aurora: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.07,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0x56F1a7a69e5Aa09C1A6ee1AC9989e931cA906EB1",
      },
      avalanche: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.07,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0xB923E2374639D0605388D91CFedAfCeCE03Cfd8f",
      },
      binance: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.07,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0x920fA0DbB65cE928C29103AeC7B5c188bbea2f24",
      },
      ethereum: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.07,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0x21ba4f6aEdA155DD77Cc33Fb93646910543F0380",
      },
      fantom: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.07,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0x3C12d813bb36295A8361C4740A732Bb700df6Db0",
      },
      moonbeam: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 0.07,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0xde3dB4FD7D7A5Cc7D8811b7BaFA4103FD90282f3",
      },
      polygon: {
        assetSymbol: "MATIC",
        assetName: "MATIC",
        minDepositAmt: 0.07,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      },
    },
  },
  {
    common_key: {
      devnet: "bnb-wei",
      testnet: "bnb-wei",
      mainnet: "bnb-wei",
    },
    is_native_asset: true,
    native_chain: "binance",
    fully_supported: true,
    decimals: 18,
    chain_aliases: {
      aura: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/A0D7A4D3545AAF4C23FE0C432503D3EFB13A796B852AEF9B1B92D39AD80BD471",
        fullDenomPath: "transfer/channel-5/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      axelar: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      comdex: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/391528154C6854D36B1446D1766F1DD93FA887B5EDFCA5A26088B6B64B703EB6",
        fullDenomPath: "transfer/channel-18/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      evmos: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/8291F71592AEE7C593D5DC05C1B66CD190B2EEA74DF09D2B8BF57BF6C4E8BCAA",
        fullDenomPath: "transfer/channel-22/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      fetch: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/1319C6B38CA613C89D78C2D1461B305038B1085F6855E8CD276FE3F7C9600B4C",
        fullDenomPath: "transfer/channel-6/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      kujira: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/E09D271B56568F9C4E4B6A32D877F4E904C35FF3B8A4503AD8547A95F6D9925C",
        fullDenomPath: "transfer/channel-8/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      osmosis: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/DF2C5FC2C96CFE255FE0B0F8DD2E7C3E91C49D03964D4078EE77C1474ECAF94B",
        fullDenomPath: "transfer/channel-312/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      sei: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/0B164939D1D7F9EF608C2BF98BEE34396DFDD5EF71F021B5CB63DA9159BD7E81",
        fullDenomPath: "transfer/channel-29/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      terra: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0002,
        ibcDenom:
          "ibc/8291F71592AEE7C593D5DC05C1B66CD190B2EEA74DF09D2B8BF57BF6C4E8BCAA",
        fullDenomPath: "transfer/channel-22/wbnb-wei",
        tokenAddress: "wbnb-wei",
      },
      aurora: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0x57A2d26A9079AF0CdB7aEf83d6978a78192f94Ab",
      },
      avalanche: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0xd020f566723e8402f925A891605c02ce7AF2477F",
      },
      binance: {
        assetSymbol: "BNB",
        assetName: "BNB",
        minDepositAmt: 0.0003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      },
      ethereum: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0xA9A2D8F279ABC436a18DBB1df3FB233039935D0A",
      },
      fantom: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0x8DA729FC44366eFE36d522B865FeC34653e85F6e",
      },
      moonbeam: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0x8d0BBbA567Ae73a06A8678e53Dc7ADD0AF6b7039",
      },
      polygon: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.0003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0x55fDE07dEF3261a41fC59B783D27A6357e8A86Df",
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
      },
      axelar: {
        assetSymbol: "WAVAX",
        assetName: "WAVAX",
        minDepositAmt: 0.0007,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "wavax-wei",
        // @ts-ignore
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
      },
      aurora: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0xb47BAb33cAE8FCa71FA28516ADCE3AF0B3e040e3",
        // @ts-ignore
      },
      avalanche: {
        assetSymbol: "AVAX",
        assetName: "AVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        // @ts-ignore
      },
      binance: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x1B29EC62efC689c462b4E0512457175793cEc9e6",
        // @ts-ignore
      },
      ethereum: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x72af7e1e7E0D38bCF033C541598F5a0301D051A5",
        // @ts-ignore
      },
      fantom: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x8776aDD48553518641a589C39792cc409d4C8B84",
        // @ts-ignore
      },
      moonbeam: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x64aae6319934995Bf30e67EBBBA9750256E07283",
        // @ts-ignore
      },
      polygon: {
        assetSymbol: "WAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.001,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0x6DD60c05FdA1255A44Ffaa9A8200b5b179A578D6",
        // @ts-ignore
      },
    },
  },
];
