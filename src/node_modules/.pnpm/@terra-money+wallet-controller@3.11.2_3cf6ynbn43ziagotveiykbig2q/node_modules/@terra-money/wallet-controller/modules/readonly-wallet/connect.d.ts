import { ReadonlyWalletSession } from './types';
export interface ReadonlyWalletController extends ReadonlyWalletSession {
    disconnect: () => void;
}
export interface ReadonlyWalletOptions extends ReadonlyWalletSession {
}
export declare function connectIfSessionExists(): ReadonlyWalletController | null;
export declare function connect(options: ReadonlyWalletOptions): ReadonlyWalletController;
