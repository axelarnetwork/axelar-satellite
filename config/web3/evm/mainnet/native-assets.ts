import { GasToken } from "@axelar-network/axelarjs-sdk";
import { NativeAssetConfig } from "../interface";

export const nativeAssets: NativeAssetConfig[] = [
  {
    id: "avax-wei",
    gas_token: GasToken.AVAX,
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
      agoric: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/004EBF085BBED1029326D56BE8A2E67C08CECE670A94AC1947DF413EF5130EB2",
        fullDenomPath: "transfer/channel-9/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      assetmantle: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/6EB0413C3DF3032748A30897930CB98993549B4475E0E61E49CFA661C071BB60",
        fullDenomPath: "transfer/channel-10/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      avalanche: {
        assetSymbol: "WAVAX",
        assetName: "WAVAX",
        minDepositAmt: 0.07,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      },
      axelar: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom: "wavax-wei",
        fullDenomPath: "wavax-wei",
        tokenAddress: "wavax-wei",
      },
      comdex: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/1D5738BD39B3189714B7A5C7CE8A206861ECAE79F7E29C45DA98151571F017E7",
        fullDenomPath: "transfer/channel-34/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      cosmoshub: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/E8F578B93A25BAE12A8BAD4C6973CF6D3BEB9AC019C8C77E566CE1FFB8F010F3",
        fullDenomPath: "transfer/channel-293/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      crescent: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/0886E3462B7DD438353781848DBDF90E58BB7DE90266E3F95E41B3FA8ED1B453",
        fullDenomPath: "transfer/channel-4/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      evmos: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/990770DB97A9567A0B794EB5A3A9BD02C939CE538661FA2DB44DD791CF16DC0E",
        fullDenomPath: "transfer/channel-21/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      fetch: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/D3D50F09F6F9A6339A8827A8A89462CAA0C349754B94EABC46D0AEEAF0E41E11",
        fullDenomPath: "transfer/channel-14/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      injective: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/A4FF8E161D2835BA06A7522684E874EFC91004AD0CD14E038F37940562158D73",
        fullDenomPath: "transfer/channel-84/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      juno: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/02B88E41C96FCADA33F15642CEE961EE17A63866EDCA4098EDDB6F9C6671EB92",
        fullDenomPath: "transfer/channel-71/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      ki: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/496812EE3F92871345EAFC70A2E747D30B13B1D99DB19538076F954DEF4B5B1D",
        fullDenomPath: "transfer/channel-19/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      kujira: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/004EBF085BBED1029326D56BE8A2E67C08CECE670A94AC1947DF413EF5130EB2",
        fullDenomPath: "transfer/channel-9/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      osmosis: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/6F62F01D913E3FFE472A38C78235B8F021B511BC6596ADFF02615C8F83D3B373",
        fullDenomPath: "transfer/channel-208/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      regen: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/47E16DE770374BE6ABE72A5264231DCEC92FD2711ACEB29B86574DBCCC228052",
        fullDenomPath: "transfer/channel-48/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      secret: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/045E01C8D691C2E404F6D2CCBB7722A8ED511F0818E180E029143D58E72EA5F7",
        fullDenomPath: "transfer/channel-20/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      stargaze: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/2956439BB6460CB7FCF72F068007FD91AE2AEA8C6B71E6B5B4FD05D0999A9CC5",
        fullDenomPath: "transfer/channel-50/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      terra: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/F992067A054C819B42D2DAB57F5CCE347D38352EB90453E59D566BFE64F1614B",
        fullDenomPath: "transfer/channel-6/wavax-wei",
        tokenAddress: "wavax-wei",
      },
      umee: {
        assetSymbol: "axlWAVAX",
        assetName: "axlWAVAX",
        minDepositAmt: 0.03,
        ibcDenom:
          "ibc/5B771473DCD5BAFE9D3C01AFC4C42872D3B104D9CFA7924A9D02E5DEAB8D20E3",
        fullDenomPath: "transfer/channel-33/wavax-wei",
        tokenAddress: "wavax-wei",
      },
    },
  },
  {
    id: "ftm-wei",
    gas_token: GasToken.FTM,
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
      agoric: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/E67ADA2204A941CD4743E70771BA08E24885E1ADD6FD140CE1F9E0FEBB68C6B2",
        fullDenomPath: "transfer/channel-9/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      assetmantle: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/7A6F5C3C7459DAB639CF605D605CF5D291944B72DF233284C5150DB548B2018C",
        fullDenomPath: "transfer/channel-10/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      axelar: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "wftm-wei",
      },
      comdex: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/78A0828C273648513517BC6C10D9F7F2768472DD5C0F88B27CB54E346CB57D59",
        fullDenomPath: "transfer/channel-34/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      cosmoshub: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/80A8DBDCDC0AD1CF1781110E8438D894199BA2E4240A65DBB833A665E41620CB",
        fullDenomPath: "transfer/channel-293/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      crescent: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/23B62EFD1B9444733889B42362570C774801430A1C656A0A3F8D6D69AE93ED8B",
        fullDenomPath: "transfer/channel-4/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      evmos: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/B389DF077401C819F7A4235167AC1399790FB819983191A3AFC646C7364D24C9",
        fullDenomPath: "transfer/channel-21/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      fantom: {
        assetSymbol: "WFTM",
        assetName: "WFTM",
        minDepositAmt: 4,
        ibcDenom: "wftm-wei",
        fullDenomPath: "wftm-wei",
        tokenAddress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
      },
      fetch: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/D504766328F350B25FD8189529ADACB32C365EBEC92D9A719D151BFD0B016E47",
        fullDenomPath: "transfer/channel-14/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      injective: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/31E8DDA49D53535F358B29CFCBED1B9224DAAFE82788C0477930DCDE231DA878",
        fullDenomPath: "transfer/channel-84/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      juno: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/BCA8E085B8D4D9D89D5316165E51545B826C5E034EACD6C00A7464C58F318379",
        fullDenomPath: "transfer/channel-71/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      ki: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/CC7B0778EABFED87BA0B91C38A9127524DB191BFD6C230FA1862456BE04424A4",
        fullDenomPath: "transfer/channel-19/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      kujira: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/E67ADA2204A941CD4743E70771BA08E24885E1ADD6FD140CE1F9E0FEBB68C6B2",
        fullDenomPath: "transfer/channel-9/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      osmosis: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/5E2DFDF1734137302129EA1C1BA21A580F96F778D4F021815EA4F6DB378DA1A4",
        fullDenomPath: "transfer/channel-208/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      regen: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/E8FF33FF39F5AD98A45CBE679B02ADB861D477B418896002243B32DCD042FF26",
        fullDenomPath: "transfer/channel-48/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      secret: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/6B9DEBE62EBA182F2AD66E1CEAE506B8F3046F86968F938DC797438014622D85",
        fullDenomPath: "transfer/channel-20/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      stargaze: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/466D2E6E9F01CA8F15172BCA6AE4288F2006038AABAB28E17182200764916E1D",
        fullDenomPath: "transfer/channel-50/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      terra: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/19E687E77D1AE3CADBB3DE487277AFEC0E340A84334D6ED3F216EF25A7075746",
        fullDenomPath: "transfer/channel-6/wftm-wei",
        tokenAddress: "wftm-wei",
      },
      umee: {
        assetSymbol: "axlWFTM",
        assetName: "axlWFTM",
        minDepositAmt: 2,
        ibcDenom:
          "ibc/87FAA671A952F1203496AEF3787AC23A06592B2B52F79149AA67C621470673E6",
        fullDenomPath: "transfer/channel-33/wftm-wei",
        tokenAddress: "wftm-wei",
      },
    },
  },
  {
    id: "matic-wei",
    gas_token: GasToken.MATIC,
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
      agoric: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/A64467480BBE4CCFC3CF7E25AD1446AA9BDBD4F5BCB9EF6038B83D6964C784E6",
        fullDenomPath: "transfer/channel-9/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        // @ts-ignore
        mintLimit: 0,
      },
      assetmantle: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/81AD1D148D8567540BE2EAF522A26F93105D453C9C4D4F35DCE11CC3B1B94E50",
        fullDenomPath: "transfer/channel-10/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        // @ts-ignore
        mintLimit: 0,
      },
      axelar: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        // @ts-ignore
        mintLimit: 0,
      },
      comdex: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/E8F0355CBC21AFD4C758E93383D28404D19AEB81E8251A63FAA0C250672ADBEF",
        fullDenomPath: "transfer/channel-34/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        // @ts-ignore
        mintLimit: 0,
      },
      cosmoshub: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/BB5D7FBBA895E6E43EAD8D49E084319663139CA438E41796A0ACB657AE64E8F3",
        fullDenomPath: "transfer/channel-293/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        // @ts-ignore
        mintLimit: 0,
      },
      crescent: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/C322C7D0867CC3EE6FA3495DC9685E5A0F49B506369341287FDA1E110841A950",
        fullDenomPath: "transfer/channel-4/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      evmos: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/7883D6C40128A175BF42226F013671C0B190F2AC2CA9215896EBD6F7F7097A77",
        fullDenomPath: "transfer/channel-21/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      fetch: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/F4B35F5F93407AED0909071A36ADDBBFF7757DFBFFDF4AD134539CA415407D30",
        fullDenomPath: "transfer/channel-14/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      injective: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/7E23647941230DA0AB4ED10F599647D9BE34E1C991D0DA032B5A1522941EBA73",
        fullDenomPath: "transfer/channel-84/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      juno: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/C3A8C0BA97F3CD808F828E422CCBB39A5206644DF0A65FA79160E4413684EE14",
        fullDenomPath: "transfer/channel-71/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      ki: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/45368D217CE1F76A1214FA6F1F31493B5F127793E6AB4873B39A81A8CE21A18E",
        fullDenomPath: "transfer/channel-19/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      kujira: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/A64467480BBE4CCFC3CF7E25AD1446AA9BDBD4F5BCB9EF6038B83D6964C784E6",
        fullDenomPath: "transfer/channel-9/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      osmosis: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/AB589511ED0DD5FA56171A39978AFBF1371DB986EC1C3526CE138A16377E39BB",
        fullDenomPath: "transfer/channel-208/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      polygon: {
        assetSymbol: "WMATIC",
        assetName: "WMATIC",
        minDepositAmt: 1,
        ibcDenom: "wmatic-wei",
        fullDenomPath: "wmatic-wei",
        tokenAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        // @ts-ignore
        mintLimit: 1e24,
      },
      regen: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/08F89698ED1AEB855854C63901306D16E98186756A842828733252405675AF13",
        fullDenomPath: "transfer/channel-48/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      secret: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/044FB7DDE7236498107023152F9F235E5DB50D9E999761CB3D4CF8C217F938F6",
        fullDenomPath: "transfer/channel-20/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      stargaze: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/37101BD82084D308D036ABE69D991417F5D2EB0D2C7DC387BB5AE8DAE08ADD0D",
        fullDenomPath: "transfer/channel-50/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      terra: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/14E4FD1AB72DE9BF1D6725CBA18373C406CB9A7DA17955299F3F4DC5C6131A4E",
        fullDenomPath: "transfer/channel-6/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      umee: {
        assetSymbol: "axlWMATIC",
        assetName: "axlWMATIC",
        minDepositAmt: 0.6,
        ibcDenom:
          "ibc/FAEC929814E0D916C019EB4B8BE58360EC3B6AB6A2B3185CB1EA0B54832DEE68",
        fullDenomPath: "transfer/channel-33/wmatic-wei",
        tokenAddress: "wmatic-wei",
        // @ts-ignore
        mintLimit: 0,
      },
    },
  },
  {
    id: "bnb-wei",
    gas_token: GasToken.BINANCE,
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
      agoric: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/DADB399E742FCEE71853E98225D13E44E90292852CD0033DF5CABAB96F80B833",
        fullDenomPath: "transfer/channel-9/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      assetmantle: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/C50DBE8B3FEF01C20C8049754E1066A89EC57BC15122699C2DDAA6D7581F2EAE",
        fullDenomPath: "transfer/channel-10/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      axelar: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      binance: {
        assetSymbol: "WBNB",
        assetName: "WBNB",
        minDepositAmt: 0.003,
        ibcDenom: "wbnb-wei",
        fullDenomPath: "wbnb-wei",
        tokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        // @ts-ignore
        mintLimit: 3e21,
      },
      comdex: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/EC7576E3F8D254787264F0972E6518E42CFFB5305EC9D0BC7DD7B7FFEFACB28A",
        fullDenomPath: "transfer/channel-34/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      cosmoshub: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/771FB23883042F959CDCB02F3D0501CC7F32EF4E28835EE4D7DA8CA7E8CF16F6",
        fullDenomPath: "transfer/channel-293/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      crescent: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/3D4499D811B055223D0EFB06D2211F84772CAEF0FB987F71BAE716191714B391",
        fullDenomPath: "transfer/channel-4/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      evmos: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/5BDA280DA1EA865301F0DB343F87971D6E6C399152B335D8CE475EEA2BA38D21",
        fullDenomPath: "transfer/channel-21/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      fetch: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/26786027D954FD05D66A965F3081891D513001B5B2487BD01820E0109598E07E",
        fullDenomPath: "transfer/channel-14/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      injective: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/B877B8EF095028B807370AB5C7790CA0C328777C9FF09AA7F5436BA7FAE4A86F",
        fullDenomPath: "transfer/channel-84/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      juno: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/735AFF12D7AF5EEC8F4339448BBF001547AEA05CCA6F1CAA60C139AE87828EB1",
        fullDenomPath: "transfer/channel-71/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      ki: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/F4B1551A3470D93A725460F109FB57990702B703790D8A21C7DC66AEF3BACBF4",
        fullDenomPath: "transfer/channel-19/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      kujira: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/DADB399E742FCEE71853E98225D13E44E90292852CD0033DF5CABAB96F80B833",
        fullDenomPath: "transfer/channel-9/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      osmosis: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/F4A070A6D78496D53127EA85C094A9EC87DFC1F36071B8CCDDBD020F933D213D",
        fullDenomPath: "transfer/channel-208/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      regen: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/E83EB9C4EC33A836E4E9B0F3216A85BF54996A8891F366F2F677EE0E012AADC2",
        fullDenomPath: "transfer/channel-48/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      secret: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/4870D3BE3BD3C44C7069588BEC579928D399D983E9D02F0113A4878DAF135F0A",
        fullDenomPath: "transfer/channel-20/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      stargaze: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/255D3F30759F44A6885DD2A625F60CA2866AAD7B15DAF40A5525F5ADCF915124",
        fullDenomPath: "transfer/channel-50/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      terra: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/1319C6B38CA613C89D78C2D1461B305038B1085F6855E8CD276FE3F7C9600B4C",
        fullDenomPath: "transfer/channel-6/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      umee: {
        assetSymbol: "axlWBNB",
        assetName: "axlWBNB",
        minDepositAmt: 0.002,
        ibcDenom:
          "ibc/8184469200C5E667794375F5B0EC3B9ABB6FF79082941BF5D0F8FF59FEBA862E",
        fullDenomPath: "transfer/channel-33/wbnb-wei",
        tokenAddress: "wbnb-wei",
        // @ts-ignore
        mintLimit: 0,
      },
    },
  },
  {
    id: "glmr-wei",
    gas_token: GasToken.GLMR,
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
      agoric: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/C8D63703F5805CE6A2B20555139CF6ED9CDFA870389648EB08D688B94B0AE2C1",
        fullDenomPath: "transfer/channel-9/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      assetmantle: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/ECE7689D69D6EEB7354B975B75F5402A840A30C0E01AE9E9493FB1E8A886FA17",
        fullDenomPath: "transfer/channel-10/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      axelar: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom: "wglmr-wei",
        fullDenomPath: "wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      comdex: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/14308B897F7966AD643E337853EC613200E9A123D159984DE7B59FE151BCE867",
        fullDenomPath: "transfer/channel-34/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      cosmoshub: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/6CB279447A96B991FA8986DC4C22C866D215DE1DCDF5F833B81180329FE8001A",
        fullDenomPath: "transfer/channel-293/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      crescent: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/A7C06A800850847DBCC36213185EC5AAD3C719D42D1F0623F9C1F9EFF456F673",
        fullDenomPath: "transfer/channel-4/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      evmos: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/E9528EEB1589F209D5EA99BA6BDB1634A65DFD883769D53072DDD26FE7DE8CA3",
        fullDenomPath: "transfer/channel-21/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      fetch: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/BD3F897C555871388A0F8CCA1B4AA0F02280FA9DD2F34E62BBCC7947A89442AD",
        fullDenomPath: "transfer/channel-14/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      injective: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/8FF72FB47F07B4AFA8649500A168683BEFCB9EE164BD331FA597D26224D51055",
        fullDenomPath: "transfer/channel-84/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      juno: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/5539E7CB6FF8FDA12AE6BF20E8862513D787BF1712296EB4AA06DD86920FFBC1",
        fullDenomPath: "transfer/channel-71/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      ki: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/927DA5BD557C059E3FA6816B2023B24EE4C1B149CDBFBC70A771F8C425DBB91A",
        fullDenomPath: "transfer/channel-19/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      kujira: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/C8D63703F5805CE6A2B20555139CF6ED9CDFA870389648EB08D688B94B0AE2C1",
        fullDenomPath: "transfer/channel-9/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      moonbeam: {
        assetSymbol: "WGLMR",
        assetName: "WGLMR",
        minDepositAmt: 2,
        ibcDenom: "wglmr-wei",
        fullDenomPath: "wglmr-wei",
        tokenAddress: "0xAcc15dC74880C9944775448304B263D191c6077F",
        // @ts-ignore
        mintLimit: 2e24,
      },
      osmosis: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/1E26DB0E5122AED464D98462BD384FCCB595732A66B3970AE6CE0B58BAE0FC49",
        fullDenomPath: "transfer/channel-208/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      regen: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/417455B944F2C3A47811DB1C6AFA740911198939A97A987F0DEF94326D38E4D5",
        fullDenomPath: "transfer/channel-48/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      secret: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/A79A703A34F0F6F3316FBF80D31F2D1070C0B61F0945DA91D89D0F0923243B60",
        fullDenomPath: "transfer/channel-20/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      stargaze: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/F5F22EE73EEED5761E86E854E3BF09B32B321201A659B80A9FA04C7D2C087E1E",
        fullDenomPath: "transfer/channel-50/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      terra: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/D54CE4CD2927F744CDCA844DD0E1A5DF88762274C55CD9AAB13E504A29BE8933",
        fullDenomPath: "transfer/channel-6/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      umee: {
        assetSymbol: "axlWGLMR",
        assetName: "axlWGLMR",
        minDepositAmt: 0.9,
        ibcDenom:
          "ibc/A629BAD41F2473B47BB6D340A1E58D1C02372DAF005DD4B7AC1BD1F44B2593E2",
        fullDenomPath: "transfer/channel-33/wglmr-wei",
        tokenAddress: "wglmr-wei",
        // @ts-ignore
        mintLimit: 0,
      },
    },
  },
  {
    id: "neth-wei",
    gas_token: GasToken.ETH,
    common_key: {
      devnet: "neth-wei",
      testnet: "neth-wei",
      mainnet: "neth-wei",
    },
    is_native_asset: true,
    native_chain: "ethereum",
    fully_supported: true,
    decimals: 18,
    chain_aliases: {
      agoric: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/1B38805B1C75352B28169284F96DF56BDEBD9E8FAC005BDCC8CF0378C82AA8E7",
        fullDenomPath: "transfer/channel-9/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      assetmantle: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/3EFE89848528B4A5665D0102DB818C6B19E04E17455197E92BECC3C41A7F7D78",
        fullDenomPath: "transfer/channel-10/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      axelar: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom: "weth-wei",
        fullDenomPath: "weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      comdex: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/81C3A46287D7664A8FD19843AC8D0CFD6C284EF1F750C661C48B3544277B1B29",
        fullDenomPath: "transfer/channel-34/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      cosmoshub: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/3C168643B15498A2F8BA843649D7CF207EA2F5A7C8AE77BC175EC2FBF21B1BAA",
        fullDenomPath: "transfer/channel-293/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      crescent: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/F1806958CA98757B91C3FA1573ECECD24F6FA3804F074A6977658914A49E65A3",
        fullDenomPath: "transfer/channel-4/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      ethereum: {
        assetSymbol: "WETH",
        assetName: "WETH",
        minDepositAmt: 0.008,
        ibcDenom: "weth-wei",
        fullDenomPath: "weth-wei",
        tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        // @ts-ignore
        mintLimit: 2e21,
      },
      evmos: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/356EDE917394B2AEF7F915EB24FA683A0CCB8D16DD4ECCEDC2AD0CEC6B66AC81",
        fullDenomPath: "transfer/channel-21/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      fetch: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/74712D58FE426053FE962D71BCA5BE80BF83F1BC3508E5E16EBE70241D4E73BE",
        fullDenomPath: "transfer/channel-14/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      injective: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/65A6973F7A4013335AE5FFE623FE019A78A1FEEE9B8982985099978837D764A7",
        fullDenomPath: "transfer/channel-84/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      juno: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/95A45A81521EAFDBEDAEEB6DA975C02E55B414C95AD3CE50709272366A90CA17",
        fullDenomPath: "transfer/channel-71/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      ki: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/9B68CC79EFF12D25AF712EB805C5062B8F97B2CCE5F3FE55B107EE03095514A3",
        fullDenomPath: "transfer/channel-19/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      kujira: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/1B38805B1C75352B28169284F96DF56BDEBD9E8FAC005BDCC8CF0378C82AA8E7",
        fullDenomPath: "transfer/channel-9/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      osmosis: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5",
        fullDenomPath: "transfer/channel-208/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      regen: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/62B27C470C859CBCB57DC12FCBBD357DD44CAD673362B47503FAA77523ABA028",
        fullDenomPath: "transfer/channel-48/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      secret: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/3665ACBA97B115133C35F060DB67E9671035E9ED48B2FC9140260C122D0C4E03",
        fullDenomPath: "transfer/channel-20/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      stargaze: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/08CF01F857C36D3C91C3427AA2EACFAFC07971E7AC40B6C433A9982B333F2567",
        fullDenomPath: "transfer/channel-50/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      terra: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/BC8A77AFBD872FDC32A348D3FB10CC09277C266CFE52081DE341C7EC6752E674",
        fullDenomPath: "transfer/channel-6/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
      umee: {
        assetSymbol: "axlWETH",
        assetName: "axlWETH",
        minDepositAmt: 0.0004,
        ibcDenom:
          "ibc/04CE51E6E02243E565AE676DD60336E48D455F8AAD0611FA0299A22FDAC448D6",
        fullDenomPath: "transfer/channel-33/weth-wei",
        tokenAddress: "weth-wei",
        // @ts-ignore
        mintLimit: 0,
      },
    },
  },
];
