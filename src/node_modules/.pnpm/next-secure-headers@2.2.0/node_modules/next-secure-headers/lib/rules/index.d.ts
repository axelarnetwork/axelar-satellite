export type { ContentSecurityPolicyOption } from "./content-security-policy";
export type { ExpectCTOption } from "./expect-ct";
export type { ForceHTTPSRedirectOption } from "./force-https-redirect";
export type { FrameGuardOption } from "./frame-guard";
export type { NoopenOption } from "./noopen";
export type { NosniffOption } from "./nosniff";
export type { ReferrerPolicyOption } from "./referrer-policy";
export type { XSSProtectionOption } from "./xss-protection";
export declare const rules: {
    createContentSecurityPolicyHeader: (option?: false | {
        directives: Partial<{
            childSrc: string | string[];
            "child-src": string | string[];
            connectSrc: string | string[];
            "connect-src": string | string[];
            defaultSrc: string | string[];
            "default-src": string | string[];
            fontSrc: string | string[];
            "font-src": string | string[];
            frameSrc: string | string[];
            "frame-src": string | string[];
            imgSrc: string | string[];
            "img-src": string | string[];
            manifestSrc: string | string[];
            "manifest-src": string | string[];
            mediaSrc: string | string[];
            "media-src": string | string[];
            prefetchSrc: string | string[];
            "prefetch-src": string | string[];
            objectSrc: string | string[];
            "object-src": string | string[];
            scriptSrc: string | string[];
            "script-src": string | string[];
            scriptSrcElem: string | string[];
            "script-src-elem": string | string[];
            scriptSrcAttr: string | string[];
            "script-src-attr": string | string[];
            styleSrc: string | string[];
            "style-src": string | string[];
            styleSrcElem: string | string[];
            "style-src-elem": string | string[];
            styleSrcAttr: string | string[];
            "style-src-attr": string | string[];
            workerSrc: string | string[];
            "worker-src": string | string[];
        }> & Partial<{
            baseURI: string | string[];
            "base-uri": string | string[];
            pluginTypes: string | string[];
            "plugin-types": string | string[];
            sandbox: true | "allow-downloads-without-user-activation" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
        }> & Partial<{
            formAction: string | string[];
            "form-action": string | string[];
            frameAncestors: string | string[];
            "frame-ancestors": string | string[];
            navigateTo: string | string[];
            "navigate-to": string | string[];
        }> & Partial<{
            reportURI: string | URL | (string | URL)[];
            "report-uri": string | URL | (string | URL)[];
            reportTo: string;
            "report-to": string;
        }>;
        reportOnly?: boolean | undefined;
    } | undefined, properHeaderNameGetter?: (reportOnly?: boolean) => "Content-Security-Policy" | "Content-Security-Policy-Report-Only", headerValueCreator?: (option?: false | {
        directives: Partial<{
            childSrc: string | string[];
            "child-src": string | string[];
            connectSrc: string | string[];
            "connect-src": string | string[];
            defaultSrc: string | string[];
            "default-src": string | string[];
            fontSrc: string | string[];
            "font-src": string | string[];
            frameSrc: string | string[];
            "frame-src": string | string[];
            imgSrc: string | string[];
            "img-src": string | string[];
            manifestSrc: string | string[];
            "manifest-src": string | string[];
            mediaSrc: string | string[];
            "media-src": string | string[];
            prefetchSrc: string | string[];
            "prefetch-src": string | string[];
            objectSrc: string | string[];
            "object-src": string | string[];
            scriptSrc: string | string[];
            "script-src": string | string[];
            scriptSrcElem: string | string[];
            "script-src-elem": string | string[];
            scriptSrcAttr: string | string[];
            "script-src-attr": string | string[];
            styleSrc: string | string[];
            "style-src": string | string[];
            styleSrcElem: string | string[];
            "style-src-elem": string | string[];
            styleSrcAttr: string | string[];
            "style-src-attr": string | string[];
            workerSrc: string | string[];
            "worker-src": string | string[];
        }> & Partial<{
            baseURI: string | string[];
            "base-uri": string | string[];
            pluginTypes: string | string[];
            "plugin-types": string | string[];
            sandbox: true | "allow-downloads-without-user-activation" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
        }> & Partial<{
            formAction: string | string[];
            "form-action": string | string[];
            frameAncestors: string | string[];
            "frame-ancestors": string | string[];
            navigateTo: string | string[];
            "navigate-to": string | string[];
        }> & Partial<{
            reportURI: string | URL | (string | URL)[];
            "report-uri": string | URL | (string | URL)[];
            reportTo: string;
            "report-to": string;
        }>;
        reportOnly?: boolean | undefined;
    } | undefined, fetchDirectiveToStringConverter?: (directive?: Partial<{
        childSrc: string | string[];
        "child-src": string | string[];
        connectSrc: string | string[];
        "connect-src": string | string[];
        defaultSrc: string | string[];
        "default-src": string | string[];
        fontSrc: string | string[];
        "font-src": string | string[];
        frameSrc: string | string[];
        "frame-src": string | string[];
        imgSrc: string | string[];
        "img-src": string | string[];
        manifestSrc: string | string[];
        "manifest-src": string | string[];
        mediaSrc: string | string[];
        "media-src": string | string[];
        prefetchSrc: string | string[];
        "prefetch-src": string | string[];
        objectSrc: string | string[];
        "object-src": string | string[];
        scriptSrc: string | string[];
        "script-src": string | string[];
        scriptSrcElem: string | string[];
        "script-src-elem": string | string[];
        scriptSrcAttr: string | string[];
        "script-src-attr": string | string[];
        styleSrc: string | string[];
        "style-src": string | string[];
        styleSrcElem: string | string[];
        "style-src-elem": string | string[];
        styleSrcAttr: string | string[];
        "style-src-attr": string | string[];
        workerSrc: string | string[];
        "worker-src": string | string[];
    }> | undefined) => string, documentDirectiveToStringConverter?: (directive?: Partial<{
        baseURI: string | string[];
        "base-uri": string | string[];
        pluginTypes: string | string[];
        "plugin-types": string | string[];
        sandbox: true | "allow-downloads-without-user-activation" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
    }> | undefined) => string, navigationDirectiveToStringConverter?: (directive?: Partial<{
        formAction: string | string[];
        "form-action": string | string[];
        frameAncestors: string | string[];
        "frame-ancestors": string | string[];
        navigateTo: string | string[];
        "navigate-to": string | string[];
    }> | undefined) => string, reportingDirectiveToStringConverter?: (directive?: Partial<{
        reportURI: string | URL | (string | URL)[];
        "report-uri": string | URL | (string | URL)[];
        reportTo: string;
        "report-to": string;
    }> | undefined) => string) => string | undefined) => import("../shared").ResponseHeader | undefined;
    createExpectCTHeader: (option?: boolean | [true, Partial<{
        maxAge: number;
        enforce: boolean;
        reportURI: string | URL;
    }>] | undefined, headerValueCreator?: (option?: boolean | [true, Partial<{
        maxAge: number;
        enforce: boolean;
        reportURI: string | URL;
    }>] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => import("../shared").ResponseHeader | undefined;
    createForceHTTPSRedirectHeader: (option?: boolean | [true, Partial<{
        maxAge: number;
        includeSubDomains: boolean;
        preload: boolean;
    }>] | undefined, headerValueCreator?: (option?: boolean | [true, Partial<{
        maxAge: number;
        includeSubDomains: boolean;
        preload: boolean;
    }>] | undefined) => string | undefined) => import("../shared").ResponseHeader;
    createFrameGuardHeader: (option?: false | ["allow-from", {
        uri: string | URL;
    }] | "deny" | "sameorigin" | undefined, headerValueCreator?: (option?: false | ["allow-from", {
        uri: string | URL;
    }] | "deny" | "sameorigin" | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => import("../shared").ResponseHeader;
    createNoopenHeader: (option?: false | "noopen" | undefined, headerValueCreator?: (option?: false | "noopen" | undefined) => string | undefined) => import("../shared").ResponseHeader;
    createNosniffHeader: (option?: false | "nosniff" | undefined, headerValueCreator?: (option?: false | "nosniff" | undefined) => string | undefined) => import("../shared").ResponseHeader;
    createReferrerPolicyHeader: (option?: false | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | ("no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin")[] | undefined, headerValueCreator?: (option?: false | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | ("no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin")[] | undefined) => string | undefined) => import("../shared").ResponseHeader | undefined;
    createXSSProtectionHeader: (option?: false | ["report", {
        uri: string | URL;
    }] | "sanitize" | "block-rendering" | undefined, headerValueCreator?: (option?: false | ["report", {
        uri: string | URL;
    }] | "sanitize" | "block-rendering" | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => import("../shared").ResponseHeader;
};
