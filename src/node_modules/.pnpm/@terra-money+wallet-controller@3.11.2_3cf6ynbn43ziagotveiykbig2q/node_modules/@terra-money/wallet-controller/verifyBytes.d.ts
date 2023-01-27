/// <reference types="node" />
import { SignBytesResult } from '@terra-money/wallet-types';
export declare function verifyBytes(bytes: Buffer, signBytesResult: SignBytesResult['result']): boolean;
