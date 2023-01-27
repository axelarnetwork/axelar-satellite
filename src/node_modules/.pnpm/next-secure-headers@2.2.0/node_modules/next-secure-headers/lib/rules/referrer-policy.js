"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferrerPolicyHeader = exports.createReferrerPolicyHeaderValue = void 0;
const shared_1 = require("./shared");
const supportedValues = [
    "no-referrer",
    "no-referrer-when-downgrade",
    "origin",
    "origin-when-cross-origin",
    "same-origin",
    "strict-origin",
    "strict-origin-when-cross-origin",
];
const headerName = "Referrer-Policy";
const createReferrerPolicyHeaderValue = (option) => {
    if (option == undefined)
        return;
    if (option === false)
        return;
    const values = shared_1.wrapArray(option);
    values.forEach((value) => {
        if (value === "unsafe-url")
            throw new Error(`Cannot specify a dangerous value for ${headerName}: ${value}`);
        if (!supportedValues.includes(value))
            throw new Error(`Invalid value for ${headerName}: ${value}`);
    });
    return values.join(", ");
};
exports.createReferrerPolicyHeaderValue = createReferrerPolicyHeaderValue;
const createReferrerPolicyHeader = (option, headerValueCreator = exports.createReferrerPolicyHeaderValue) => {
    if (option == undefined)
        return;
    if (option === false)
        return;
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
exports.createReferrerPolicyHeader = createReferrerPolicyHeader;
