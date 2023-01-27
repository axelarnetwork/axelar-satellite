"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toConnectedWallet = void 0;
const wallet_types_1 = require("@terra-money/wallet-types");
const operators_1 = require("rxjs/operators");
function toConnectedWallet(controller) {
    return (0, operators_1.map)((states) => {
        if (states.status === wallet_types_1.WalletStatus.WALLET_CONNECTED) {
            return (0, wallet_types_1.createConnectedWallet)({
                connection: states.connection,
                network: states.network,
                wallets: states.wallets,
                post: controller.post,
                sign: controller.sign,
                signBytes: controller.signBytes,
                supportFeatures: states.supportFeatures,
                status: states.status,
            });
        }
        return undefined;
    });
}
exports.toConnectedWallet = toConnectedWallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Db25uZWN0ZWRXYWxsZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL29wZXJhdG9ycy90b0Nvbm5lY3RlZFdhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFLbUM7QUFFbkMsOENBQXFDO0FBR3JDLFNBQWdCLGlCQUFpQixDQUMvQixVQUE0QjtJQUU1QixPQUFPLElBQUEsZUFBRyxFQUE0QyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQy9ELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSywyQkFBWSxDQUFDLGdCQUFnQixFQUFFO1lBQ25ELE9BQU8sSUFBQSxvQ0FBcUIsRUFBQztnQkFDM0IsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO2dCQUM3QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0JBQ3ZCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztnQkFDdkIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2dCQUNyQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7Z0JBQ3JCLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztnQkFDL0IsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO2dCQUN2QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsQkQsOENBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29ubmVjdGVkV2FsbGV0LFxuICBjcmVhdGVDb25uZWN0ZWRXYWxsZXQsXG4gIFdhbGxldFN0YXRlcyxcbiAgV2FsbGV0U3RhdHVzLFxufSBmcm9tICdAdGVycmEtbW9uZXkvd2FsbGV0LXR5cGVzJztcbmltcG9ydCB7IE9wZXJhdG9yRnVuY3Rpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdhbGxldENvbnRyb2xsZXIgfSBmcm9tICcuLi9jb250cm9sbGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvQ29ubmVjdGVkV2FsbGV0KFxuICBjb250cm9sbGVyOiBXYWxsZXRDb250cm9sbGVyLFxuKTogT3BlcmF0b3JGdW5jdGlvbjxXYWxsZXRTdGF0ZXMsIENvbm5lY3RlZFdhbGxldCB8IHVuZGVmaW5lZD4ge1xuICByZXR1cm4gbWFwPFdhbGxldFN0YXRlcywgQ29ubmVjdGVkV2FsbGV0IHwgdW5kZWZpbmVkPigoc3RhdGVzKSA9PiB7XG4gICAgaWYgKHN0YXRlcy5zdGF0dXMgPT09IFdhbGxldFN0YXR1cy5XQUxMRVRfQ09OTkVDVEVEKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQ29ubmVjdGVkV2FsbGV0KHtcbiAgICAgICAgY29ubmVjdGlvbjogc3RhdGVzLmNvbm5lY3Rpb24sXG4gICAgICAgIG5ldHdvcms6IHN0YXRlcy5uZXR3b3JrLFxuICAgICAgICB3YWxsZXRzOiBzdGF0ZXMud2FsbGV0cyxcbiAgICAgICAgcG9zdDogY29udHJvbGxlci5wb3N0LFxuICAgICAgICBzaWduOiBjb250cm9sbGVyLnNpZ24sXG4gICAgICAgIHNpZ25CeXRlczogY29udHJvbGxlci5zaWduQnl0ZXMsXG4gICAgICAgIHN1cHBvcnRGZWF0dXJlczogc3RhdGVzLnN1cHBvcnRGZWF0dXJlcyxcbiAgICAgICAgc3RhdHVzOiBzdGF0ZXMuc3RhdHVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0pO1xufVxuIl19