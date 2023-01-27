"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForceHTTPSRedirectHeader = exports.createHSTSHeaderValue = void 0;
const headerName = "Strict-Transport-Security";
const defaultMaxAge = 60 * 60 * 24 * 365 * 2; // 2 years
const createHSTSHeaderValue = (option) => {
    var _a;
    if (option == undefined)
        return `max-age=${defaultMaxAge}`;
    if (option === false)
        return;
    if (option === true)
        return `max-age=${defaultMaxAge}`;
    if (Array.isArray(option)) {
        if (option[0] !== true)
            throw new Error(`Invalid value for ${headerName} in the first option: ${option[0]}`);
        const maxAge = (_a = option[1].maxAge) !== null && _a !== void 0 ? _a : defaultMaxAge;
        if (typeof maxAge !== "number" || !Number.isFinite(maxAge)) {
            throw new Error(`Invalid value for "maxAge" option in ${headerName}: ${maxAge}`);
        }
        const { includeSubDomains, preload } = option[1];
        return [`max-age=${maxAge}`, includeSubDomains ? "includeSubDomains" : undefined, preload ? "preload" : undefined]
            .filter((value) => value != undefined)
            .join("; ");
    }
    throw new Error(`Invaild value for ${headerName}: ${option}`);
};
exports.createHSTSHeaderValue = createHSTSHeaderValue;
const createForceHTTPSRedirectHeader = (option, headerValueCreator = exports.createHSTSHeaderValue) => {
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
exports.createForceHTTPSRedirectHeader = createForceHTTPSRedirectHeader;
