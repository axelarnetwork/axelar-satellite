import { Chain } from "wagmi";
import { AssetConfig, GasToken } from "@axelar-network/axelarjs-sdk";
export interface ChainExtension extends Chain {
  networkNameOverride: string;
}

export interface NativeAssetConfig extends AssetConfig {
  id: string;
  is_native_asset?: boolean;
  gas_token?: GasToken;
}
