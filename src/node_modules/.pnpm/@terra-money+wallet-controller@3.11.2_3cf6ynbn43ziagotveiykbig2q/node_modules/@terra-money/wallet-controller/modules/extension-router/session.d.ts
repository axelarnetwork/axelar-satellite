export declare const storage: Storage | undefined;
interface Session {
    identifier: string;
}
export declare function getStoredSession(): Session | undefined;
export declare function storeSession(session: Session): void;
export declare function clearSession(): void;
export {};
