"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectedWallet = void 0;
const wallet_types_1 = require("@terra-money/wallet-types");
const react_1 = require("react");
const useWallet_1 = require("./useWallet");
function useConnectedWallet() {
    const { status, network, wallets, post, sign, signBytes, supportFeatures, connection, } = (0, useWallet_1.useWallet)();
    return (0, react_1.useMemo)(() => {
        return (0, wallet_types_1.createConnectedWallet)({
            status,
            network,
            wallets,
            post,
            sign,
            signBytes,
            supportFeatures,
            connection,
        });
    }, [
        connection,
        network,
        post,
        sign,
        signBytes,
        status,
        supportFeatures,
        wallets,
    ]);
}
exports.useConnectedWallet = useConnectedWallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29ubmVjdGVkV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0B0ZXJyYS1tb25leS91c2Utd2FsbGV0L3VzZUNvbm5lY3RlZFdhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFHbUM7QUFDbkMsaUNBQWdDO0FBQ2hDLDJDQUF3QztBQUV4QyxTQUFnQixrQkFBa0I7SUFDaEMsTUFBTSxFQUNKLE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLElBQUksRUFDSixJQUFJLEVBQ0osU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEdBQ1gsR0FBRyxJQUFBLHFCQUFTLEdBQUUsQ0FBQztJQUVoQixPQUFPLElBQUEsZUFBTyxFQUE4QixHQUFHLEVBQUU7UUFDL0MsT0FBTyxJQUFBLG9DQUFxQixFQUFDO1lBQzNCLE1BQU07WUFDTixPQUFPO1lBQ1AsT0FBTztZQUNQLElBQUk7WUFDSixJQUFJO1lBQ0osU0FBUztZQUNULGVBQWU7WUFDZixVQUFVO1NBQ1gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUFFO1FBQ0QsVUFBVTtRQUNWLE9BQU87UUFDUCxJQUFJO1FBQ0osSUFBSTtRQUNKLFNBQVM7UUFDVCxNQUFNO1FBQ04sZUFBZTtRQUNmLE9BQU87S0FDUixDQUFDLENBQUM7QUFDTCxDQUFDO0FBakNELGdEQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbm5lY3RlZFdhbGxldCxcbiAgY3JlYXRlQ29ubmVjdGVkV2FsbGV0LFxufSBmcm9tICdAdGVycmEtbW9uZXkvd2FsbGV0LXR5cGVzJztcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VXYWxsZXQgfSBmcm9tICcuL3VzZVdhbGxldCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VDb25uZWN0ZWRXYWxsZXQoKTogQ29ubmVjdGVkV2FsbGV0IHwgdW5kZWZpbmVkIHtcbiAgY29uc3Qge1xuICAgIHN0YXR1cyxcbiAgICBuZXR3b3JrLFxuICAgIHdhbGxldHMsXG4gICAgcG9zdCxcbiAgICBzaWduLFxuICAgIHNpZ25CeXRlcyxcbiAgICBzdXBwb3J0RmVhdHVyZXMsXG4gICAgY29ubmVjdGlvbixcbiAgfSA9IHVzZVdhbGxldCgpO1xuXG4gIHJldHVybiB1c2VNZW1vPENvbm5lY3RlZFdhbGxldCB8IHVuZGVmaW5lZD4oKCkgPT4ge1xuICAgIHJldHVybiBjcmVhdGVDb25uZWN0ZWRXYWxsZXQoe1xuICAgICAgc3RhdHVzLFxuICAgICAgbmV0d29yayxcbiAgICAgIHdhbGxldHMsXG4gICAgICBwb3N0LFxuICAgICAgc2lnbixcbiAgICAgIHNpZ25CeXRlcyxcbiAgICAgIHN1cHBvcnRGZWF0dXJlcyxcbiAgICAgIGNvbm5lY3Rpb24sXG4gICAgfSk7XG4gIH0sIFtcbiAgICBjb25uZWN0aW9uLFxuICAgIG5ldHdvcmssXG4gICAgcG9zdCxcbiAgICBzaWduLFxuICAgIHNpZ25CeXRlcyxcbiAgICBzdGF0dXMsXG4gICAgc3VwcG9ydEZlYXR1cmVzLFxuICAgIHdhbGxldHMsXG4gIF0pO1xufVxuIl19