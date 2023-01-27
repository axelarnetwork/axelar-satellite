import type { ResponseHeader } from "../shared";
export declare type ForceHTTPSRedirectOption = boolean | [true, Partial<{
    maxAge: number;
    includeSubDomains: boolean;
    preload: boolean;
}>];
export declare const createHSTSHeaderValue: (option?: boolean | [true, Partial<{
    maxAge: number;
    includeSubDomains: boolean;
    preload: boolean;
}>] | undefined) => string | undefined;
export declare const createForceHTTPSRedirectHeader: (option?: boolean | [true, Partial<{
    maxAge: number;
    includeSubDomains: boolean;
    preload: boolean;
}>] | undefined, headerValueCreator?: (option?: boolean | [true, Partial<{
    maxAge: number;
    includeSubDomains: boolean;
    preload: boolean;
}>] | undefined) => string | undefined) => ResponseHeader;
