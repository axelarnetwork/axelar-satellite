"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const content_security_policy_1 = require("./content-security-policy");
const expect_ct_1 = require("./expect-ct");
const force_https_redirect_1 = require("./force-https-redirect");
const frame_guard_1 = require("./frame-guard");
const noopen_1 = require("./noopen");
const nosniff_1 = require("./nosniff");
const referrer_policy_1 = require("./referrer-policy");
const xss_protection_1 = require("./xss-protection");
// From TypeScript 3.9 has been set `enumerable: false` so we cannot `import * as rules` and `jest.spyOn(rules, "xxx")` ,
// so exports manually.
exports.rules = {
    createContentSecurityPolicyHeader: content_security_policy_1.createContentSecurityPolicyHeader,
    createExpectCTHeader: expect_ct_1.createExpectCTHeader,
    createForceHTTPSRedirectHeader: force_https_redirect_1.createForceHTTPSRedirectHeader,
    createFrameGuardHeader: frame_guard_1.createFrameGuardHeader,
    createNoopenHeader: noopen_1.createNoopenHeader,
    createNosniffHeader: nosniff_1.createNosniffHeader,
    createReferrerPolicyHeader: referrer_policy_1.createReferrerPolicyHeader,
    createXSSProtectionHeader: xss_protection_1.createXSSProtectionHeader,
};
