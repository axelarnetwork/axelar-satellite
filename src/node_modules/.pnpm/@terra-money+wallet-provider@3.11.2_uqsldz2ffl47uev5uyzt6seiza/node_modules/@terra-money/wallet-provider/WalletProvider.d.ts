import { WalletControllerOptions } from '@terra-money/wallet-controller';
import { ReactNode } from 'react';
export interface WalletProviderProps extends WalletControllerOptions {
    children: ReactNode;
}
export declare function WalletProvider({ children, defaultNetwork, walletConnectChainIds, connectorOpts, pushServerOpts, createReadonlyWalletSession, selectExtension, waitingChromeExtensionInstallCheck, dangerously__chromeExtensionCompatibleBrowserCheck, plugins, }: WalletProviderProps): JSX.Element;
