import { ReadonlyWalletSession } from './types';
export declare function getStoredSession(): ReadonlyWalletSession | undefined;
export declare function storeSession(session: ReadonlyWalletSession): void;
export declare function clearStoredSession(): void;
