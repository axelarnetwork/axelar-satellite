import { TxResult } from './types';
export interface StringifiedTxResult {
    fee: string;
    gasAdjustment: string;
    id: number;
    msgs: string[];
    result: {
        height: number;
        raw_log: string;
        txhash: string;
    };
    success: boolean;
}
export declare function findTxResult(values: any[]): TxResult | undefined;
