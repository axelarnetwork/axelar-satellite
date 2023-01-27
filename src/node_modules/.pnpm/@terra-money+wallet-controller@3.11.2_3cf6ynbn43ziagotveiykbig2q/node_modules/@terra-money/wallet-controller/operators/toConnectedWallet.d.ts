import { ConnectedWallet, WalletStates } from '@terra-money/wallet-types';
import { OperatorFunction } from 'rxjs';
import { WalletController } from '../controller';
export declare function toConnectedWallet(controller: WalletController): OperatorFunction<WalletStates, ConnectedWallet | undefined>;
