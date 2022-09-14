import { AssetConfig } from "@axelar-network/axelarjs-sdk";

export const nativeAssets: AssetConfig[] = [
  {
    common_key: {
      devnet: "eth-wei",
      testnet: "eth-wei",
      mainnet: "eth-wei",
    },
    isNativeAsset: true,
    native_chain: "ethereum",
    fully_supported: true,
    decimals: 18,
    chain_aliases: {
      assetmantle: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/3EFE89848528B4A5665D0102DB818C6B19E04E17455197E92BECC3C41A7F7D78",
        fullDenomPath: "transfer/channel-10/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      comdex: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/81C3A46287D7664A8FD19843AC8D0CFD6C284EF1F750C661C48B3544277B1B29",
        fullDenomPath: "transfer/channel-34/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      cosmoshub: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/3C168643B15498A2F8BA843649D7CF207EA2F5A7C8AE77BC175EC2FBF21B1BAA",
        fullDenomPath: "transfer/channel-293/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      crescent: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/F1806958CA98757B91C3FA1573ECECD24F6FA3804F074A6977658914A49E65A3",
        fullDenomPath: "transfer/channel-4/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      ethereum: {
        assetSymbol: "ETH",
        assetName: "ETH",
        minDepositAmt: 0.006,
        ibcDenom: "NA",
        fullDenomPath: "NA",
        tokenAddress: "NA",
        //@ts-ignore
        mintLimit: 2000000000000000000000,
      },
      evmos: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/356EDE917394B2AEF7F915EB24FA683A0CCB8D16DD4ECCEDC2AD0CEC6B66AC81",
        fullDenomPath: "transfer/channel-21/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      fetch: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/74712D58FE426053FE962D71BCA5BE80BF83F1BC3508E5E16EBE70241D4E73BE",
        fullDenomPath: "transfer/channel-14/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      juno: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/95A45A81521EAFDBEDAEEB6DA975C02E55B414C95AD3CE50709272366A90CA17",
        fullDenomPath: "transfer/channel-71/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      ki: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/9B68CC79EFF12D25AF712EB805C5062B8F97B2CCE5F3FE55B107EE03095514A3",
        fullDenomPath: "transfer/channel-19/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      kujira: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/1B38805B1C75352B28169284F96DF56BDEBD9E8FAC005BDCC8CF0378C82AA8E7",
        fullDenomPath: "transfer/channel-9/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      osmosis: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5",
        fullDenomPath: "transfer/channel-208/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      regen: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/62B27C470C859CBCB57DC12FCBBD357DD44CAD673362B47503FAA77523ABA028",
        fullDenomPath: "transfer/channel-48/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      secret: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/3665ACBA97B115133C35F060DB67E9671035E9ED48B2FC9140260C122D0C4E03",
        fullDenomPath: "transfer/channel-20/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      stargaze: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/08CF01F857C36D3C91C3427AA2EACFAFC07971E7AC40B6C433A9982B333F2567",
        fullDenomPath: "transfer/channel-50/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
      terra: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0003,
        ibcDenom:
          "ibc/BC8A77AFBD872FDC32A348D3FB10CC09277C266CFE52081DE341C7EC6752E674",
        fullDenomPath: "transfer/channel-6/eth-wei",
        tokenAddress: "eth-wei",
        //@ts-ignore
        mintLimit: 0,
      },
    },
  },
];
