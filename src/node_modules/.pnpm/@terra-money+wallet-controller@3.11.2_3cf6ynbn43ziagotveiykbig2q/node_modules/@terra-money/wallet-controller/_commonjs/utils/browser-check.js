"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDesktopBrowserType = exports.isDesktopChrome = exports.isMobile = void 0;
const bowser_1 = __importDefault(require("bowser"));
const mobile_detect_1 = __importDefault(require("mobile-detect"));
const isMobile = () => {
    const mobileDetect = new mobile_detect_1.default(navigator.userAgent);
    return !!mobileDetect.os();
};
exports.isMobile = isMobile;
const isDesktopChrome = (isChromeExtensionCompatibleBrowser) => {
    const userAgent = navigator.userAgent;
    if (isChromeExtensionCompatibleBrowser) {
        return true;
    }
    const browser = bowser_1.default.getParser(userAgent);
    const mobileDetect = new mobile_detect_1.default(navigator.userAgent);
    return !!(browser.satisfies({
        chrome: '>60',
        edge: '>80',
    }) && !mobileDetect.os());
};
exports.isDesktopChrome = isDesktopChrome;
const getDesktopBrowserType = (userAgent) => {
    const browser = bowser_1.default.getParser(userAgent);
    const mobileDetect = new mobile_detect_1.default(navigator.userAgent);
    if (!!mobileDetect.mobile()) {
        return null;
    }
    if (browser.satisfies({ chrome: '>60', chromium: '>60' })) {
        return 'chrome';
    }
    else if (browser.satisfies({ edge: '>80' })) {
        return 'edge';
    }
    else {
        return null;
    }
};
exports.getDesktopBrowserType = getDesktopBrowserType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1jaGVjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AdGVycmEtbW9uZXkvd2FsbGV0LWNvbnRyb2xsZXIvdXRpbHMvYnJvd3Nlci1jaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsa0VBQXlDO0FBRWxDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUMzQixNQUFNLFlBQVksR0FBRyxJQUFJLHVCQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNELE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM3QixDQUFDLENBQUM7QUFKVyxRQUFBLFFBQVEsWUFJbkI7QUFFSyxNQUFNLGVBQWUsR0FBRyxDQUM3QixrQ0FBMkMsRUFDbEMsRUFBRTtJQUNYLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFFdEMsSUFBSSxrQ0FBa0MsRUFBRTtRQUN0QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxPQUFPLEdBQUcsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSx1QkFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUzRCxPQUFPLENBQUMsQ0FBQyxDQUNQLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDaEIsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsS0FBSztLQUNaLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FDekIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQWxCVyxRQUFBLGVBQWUsbUJBa0IxQjtBQUVLLE1BQU0scUJBQXFCLEdBQUcsQ0FDbkMsU0FBaUIsRUFDZ0MsRUFBRTtJQUNuRCxNQUFNLE9BQU8sR0FBRyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLHVCQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNELElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUMzQixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtRQUN6RCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtTQUFNLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUM7QUFqQlcsUUFBQSxxQkFBcUIseUJBaUJoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBib3dzZXIgZnJvbSAnYm93c2VyJztcbmltcG9ydCBNb2JpbGVEZXRlY3QgZnJvbSAnbW9iaWxlLWRldGVjdCc7XG5cbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9ICgpID0+IHtcbiAgY29uc3QgbW9iaWxlRGV0ZWN0ID0gbmV3IE1vYmlsZURldGVjdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICByZXR1cm4gISFtb2JpbGVEZXRlY3Qub3MoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0Rlc2t0b3BDaHJvbWUgPSAoXG4gIGlzQ2hyb21lRXh0ZW5zaW9uQ29tcGF0aWJsZUJyb3dzZXI6IGJvb2xlYW4sXG4pOiBib29sZWFuID0+IHtcbiAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICBpZiAoaXNDaHJvbWVFeHRlbnNpb25Db21wYXRpYmxlQnJvd3Nlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgYnJvd3NlciA9IGJvd3Nlci5nZXRQYXJzZXIodXNlckFnZW50KTtcbiAgY29uc3QgbW9iaWxlRGV0ZWN0ID0gbmV3IE1vYmlsZURldGVjdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICByZXR1cm4gISEoXG4gICAgYnJvd3Nlci5zYXRpc2ZpZXMoe1xuICAgICAgY2hyb21lOiAnPjYwJyxcbiAgICAgIGVkZ2U6ICc+ODAnLFxuICAgIH0pICYmICFtb2JpbGVEZXRlY3Qub3MoKVxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERlc2t0b3BCcm93c2VyVHlwZSA9IChcbiAgdXNlckFnZW50OiBzdHJpbmcsXG4pOiAnY2hyb21lJyB8ICdlZGdlJyB8ICdmaXJlZm94JyB8ICdzYWZhcmknIHwgbnVsbCA9PiB7XG4gIGNvbnN0IGJyb3dzZXIgPSBib3dzZXIuZ2V0UGFyc2VyKHVzZXJBZ2VudCk7XG4gIGNvbnN0IG1vYmlsZURldGVjdCA9IG5ldyBNb2JpbGVEZXRlY3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgaWYgKCEhbW9iaWxlRGV0ZWN0Lm1vYmlsZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoYnJvd3Nlci5zYXRpc2ZpZXMoeyBjaHJvbWU6ICc+NjAnLCBjaHJvbWl1bTogJz42MCcgfSkpIHtcbiAgICByZXR1cm4gJ2Nocm9tZSc7XG4gIH0gZWxzZSBpZiAoYnJvd3Nlci5zYXRpc2ZpZXMoeyBlZGdlOiAnPjgwJyB9KSkge1xuICAgIHJldHVybiAnZWRnZSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iXX0=