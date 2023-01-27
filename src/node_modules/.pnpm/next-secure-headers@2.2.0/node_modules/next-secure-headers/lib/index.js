"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSecureHeaders = exports.createSecureHeaders = exports.createHeadersObject = void 0;
const React = require("react");
const rules_1 = require("./rules");
const createHeadersObject = (options = {}) => {
    const newHeaders = {};
    [
        rules_1.rules.createContentSecurityPolicyHeader(options.contentSecurityPolicy),
        rules_1.rules.createExpectCTHeader(options.expectCT),
        rules_1.rules.createForceHTTPSRedirectHeader(options.forceHTTPSRedirect),
        rules_1.rules.createFrameGuardHeader(options.frameGuard),
        rules_1.rules.createNoopenHeader(options.noopen),
        rules_1.rules.createNosniffHeader(options.nosniff),
        rules_1.rules.createReferrerPolicyHeader(options.referrerPolicy),
        rules_1.rules.createXSSProtectionHeader(options.xssProtection),
    ].forEach((header) => {
        if (header == undefined)
            return;
        if (header.value == undefined)
            return;
        newHeaders[header.name] = header.value;
    });
    return newHeaders;
};
exports.createHeadersObject = createHeadersObject;
const createSecureHeaders = (options = {}) => {
    const headersObject = exports.createHeadersObject(options);
    const headers = [];
    Object.entries(headersObject).forEach(([key, value]) => {
        headers.push({ key, value });
    });
    return headers;
};
exports.createSecureHeaders = createSecureHeaders;
const withSecureHeaders = (options = {}) => (ChildComponent) => {
    const Component = (props) => React.createElement(ChildComponent, props);
    Component.getInitialProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (context == undefined)
            throw new Error("Cannnot find a context in getInitialProps");
        const initialProps = (_b = (yield ((_a = ChildComponent.getInitialProps) === null || _a === void 0 ? void 0 : _a.call(ChildComponent, context)))) !== null && _b !== void 0 ? _b : {};
        const res = (_c = context.res) !== null && _c !== void 0 ? _c : (_d = context.ctx) === null || _d === void 0 ? void 0 : _d.res;
        if (res == undefined)
            return initialProps;
        if (res.headersSent)
            return initialProps;
        const headers = exports.createHeadersObject(options);
        Object.entries(headers).forEach(([name, value]) => res.setHeader(name, value));
        return initialProps;
    });
    return Component;
};
exports.withSecureHeaders = withSecureHeaders;
