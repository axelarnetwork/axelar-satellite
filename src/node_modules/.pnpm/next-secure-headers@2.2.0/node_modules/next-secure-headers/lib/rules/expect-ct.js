"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpectCTHeader = exports.createExpectCTHeaderValue = void 0;
const shared_1 = require("./shared");
const headerName = "Expect-CT";
const defaultMaxAge = 60 * 60 * 24; // 1 day
const createExpectCTHeaderValue = (option, strictURIEncoder = shared_1.encodeStrictURI) => {
    var _a;
    if (option == undefined)
        return;
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
        const { enforce, reportURI } = option[1];
        return [
            `max-age=${maxAge}`,
            enforce ? "enforce" : undefined,
            reportURI != undefined ? `report-uri=${strictURIEncoder(reportURI)}` : undefined,
        ]
            .filter((value) => value != undefined)
            .join(", ");
    }
    throw new Error(`Invalid value for ${headerName}: ${option}`);
};
exports.createExpectCTHeaderValue = createExpectCTHeaderValue;
const createExpectCTHeader = (option, headerValueCreator = exports.createExpectCTHeaderValue) => {
    if (option == undefined)
        return;
    if (option === false)
        return;
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
exports.createExpectCTHeader = createExpectCTHeader;
