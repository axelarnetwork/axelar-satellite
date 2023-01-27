import { Connection, ConnectType } from '@terra-money/wallet-types';
export declare function selectConnection(connections: Connection[]): Promise<[type: ConnectType, identifier: string | undefined] | null>;
