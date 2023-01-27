"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBytes = void 0;
const jscrypto_1 = __importDefault(require("jscrypto"));
const secp256k1_1 = __importDefault(require("secp256k1"));
function verifyBytes(bytes, signBytesResult) {
    var _a;
    const publicKey = (_a = signBytesResult.public_key) === null || _a === void 0 ? void 0 : _a.toProto();
    if (publicKey && 'key' in publicKey) {
        return secp256k1_1.default.ecdsaVerify(signBytesResult.signature, Buffer.from(jscrypto_1.default.SHA256.hash(new jscrypto_1.default.Word32Array(bytes)).toString(), 'hex'), publicKey.key);
    }
    return false;
}
exports.verifyBytes = verifyBytes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5Qnl0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL3ZlcmlmeUJ5dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHdEQUFnQztBQUNoQywwREFBa0M7QUFFbEMsU0FBZ0IsV0FBVyxDQUN6QixLQUFhLEVBQ2IsZUFBMEM7O0lBRTFDLE1BQU0sU0FBUyxHQUFHLE1BQUEsZUFBZSxDQUFDLFVBQVUsMENBQUUsT0FBTyxFQUFFLENBQUM7SUFFeEQsSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtRQUNuQyxPQUFPLG1CQUFTLENBQUMsV0FBVyxDQUMxQixlQUFlLENBQUMsU0FBUyxFQUN6QixNQUFNLENBQUMsSUFBSSxDQUNULGtCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ2hFLEtBQUssQ0FDTixFQUNELFNBQVMsQ0FBQyxHQUFHLENBQ2QsQ0FBQztLQUNIO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBbEJELGtDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpZ25CeXRlc1Jlc3VsdCB9IGZyb20gJ0B0ZXJyYS1tb25leS93YWxsZXQtdHlwZXMnO1xuaW1wb3J0IGpzY3J5cHRvIGZyb20gJ2pzY3J5cHRvJztcbmltcG9ydCBzZWNwMjU2azEgZnJvbSAnc2VjcDI1NmsxJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeUJ5dGVzKFxuICBieXRlczogQnVmZmVyLFxuICBzaWduQnl0ZXNSZXN1bHQ6IFNpZ25CeXRlc1Jlc3VsdFsncmVzdWx0J10sXG4pOiBib29sZWFuIHtcbiAgY29uc3QgcHVibGljS2V5ID0gc2lnbkJ5dGVzUmVzdWx0LnB1YmxpY19rZXk/LnRvUHJvdG8oKTtcblxuICBpZiAocHVibGljS2V5ICYmICdrZXknIGluIHB1YmxpY0tleSkge1xuICAgIHJldHVybiBzZWNwMjU2azEuZWNkc2FWZXJpZnkoXG4gICAgICBzaWduQnl0ZXNSZXN1bHQuc2lnbmF0dXJlLFxuICAgICAgQnVmZmVyLmZyb20oXG4gICAgICAgIGpzY3J5cHRvLlNIQTI1Ni5oYXNoKG5ldyBqc2NyeXB0by5Xb3JkMzJBcnJheShieXRlcykpLnRvU3RyaW5nKCksXG4gICAgICAgICdoZXgnLFxuICAgICAgKSxcbiAgICAgIHB1YmxpY0tleS5rZXksXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==