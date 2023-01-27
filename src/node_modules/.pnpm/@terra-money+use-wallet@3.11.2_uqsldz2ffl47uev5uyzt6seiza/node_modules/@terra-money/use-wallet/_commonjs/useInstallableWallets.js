"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInstallableWallets = void 0;
const wallet_types_1 = require("@terra-money/wallet-types");
const react_1 = require("react");
const useWallet_1 = require("./useWallet");
function useInstallableWallets() {
    const { status, availableInstallations } = (0, useWallet_1.useWallet)();
    return (0, react_1.useMemo)(() => {
        return (0, wallet_types_1.createInstallableWallets)({
            status,
            installations: availableInstallations,
        });
    }, [availableInstallations, status]);
}
exports.useInstallableWallets = useInstallableWallets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlSW5zdGFsbGFibGVXYWxsZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0B0ZXJyYS1tb25leS91c2Utd2FsbGV0L3VzZUluc3RhbGxhYmxlV2FsbGV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFHbUM7QUFDbkMsaUNBQWdDO0FBQ2hDLDJDQUF3QztBQUV4QyxTQUFnQixxQkFBcUI7SUFDbkMsTUFBTSxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxHQUFHLElBQUEscUJBQVMsR0FBRSxDQUFDO0lBRXZELE9BQU8sSUFBQSxlQUFPLEVBQUMsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sSUFBQSx1Q0FBd0IsRUFBQztZQUM5QixNQUFNO1lBQ04sYUFBYSxFQUFFLHNCQUFzQjtTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFURCxzREFTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGNyZWF0ZUluc3RhbGxhYmxlV2FsbGV0cyxcbiAgSW5zdGFsbGF0aW9uLFxufSBmcm9tICdAdGVycmEtbW9uZXkvd2FsbGV0LXR5cGVzJztcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VXYWxsZXQgfSBmcm9tICcuL3VzZVdhbGxldCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VJbnN0YWxsYWJsZVdhbGxldHMoKTogSW5zdGFsbGF0aW9uW10gfCB1bmRlZmluZWQge1xuICBjb25zdCB7IHN0YXR1cywgYXZhaWxhYmxlSW5zdGFsbGF0aW9ucyB9ID0gdXNlV2FsbGV0KCk7XG5cbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBjcmVhdGVJbnN0YWxsYWJsZVdhbGxldHMoe1xuICAgICAgc3RhdHVzLFxuICAgICAgaW5zdGFsbGF0aW9uczogYXZhaWxhYmxlSW5zdGFsbGF0aW9ucyxcbiAgICB9KTtcbiAgfSwgW2F2YWlsYWJsZUluc3RhbGxhdGlvbnMsIHN0YXR1c10pO1xufVxuIl19