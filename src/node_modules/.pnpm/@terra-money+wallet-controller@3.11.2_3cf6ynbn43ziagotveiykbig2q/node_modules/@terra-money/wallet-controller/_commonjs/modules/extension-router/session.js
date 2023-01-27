"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSession = exports.storeSession = exports.getStoredSession = exports.storage = void 0;
exports.storage = typeof window === 'undefined' ? undefined : localStorage;
const SESSION_KEY = '__terra_extension_router_session__';
function getStoredSession() {
    const data = exports.storage === null || exports.storage === void 0 ? void 0 : exports.storage.getItem(SESSION_KEY);
    if (!data) {
        return undefined;
    }
    try {
        const object = JSON.parse(data);
        if ('identifier' in object) {
            return {
                identifier: object['identifier'],
            };
        }
        else {
            exports.storage === null || exports.storage === void 0 ? void 0 : exports.storage.removeItem(SESSION_KEY);
            return undefined;
        }
    }
    catch (_a) {
        exports.storage === null || exports.storage === void 0 ? void 0 : exports.storage.removeItem(SESSION_KEY);
        return undefined;
    }
}
exports.getStoredSession = getStoredSession;
function storeSession(session) {
    exports.storage === null || exports.storage === void 0 ? void 0 : exports.storage.setItem(SESSION_KEY, JSON.stringify(session));
}
exports.storeSession = storeSession;
function clearSession() {
    exports.storage === null || exports.storage === void 0 ? void 0 : exports.storage.removeItem(SESSION_KEY);
}
exports.clearSession = clearSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AdGVycmEtbW9uZXkvd2FsbGV0LWNvbnRyb2xsZXIvbW9kdWxlcy9leHRlbnNpb24tcm91dGVyL3Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxPQUFPLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQU1oRixNQUFNLFdBQVcsR0FBRyxvQ0FBb0MsQ0FBQztBQUV6RCxTQUFnQixnQkFBZ0I7SUFDOUIsTUFBTSxJQUFJLEdBQUcsZUFBTyxhQUFQLGVBQU8sdUJBQVAsZUFBTyxDQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUzQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFFRCxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxJQUFJLFlBQVksSUFBSSxNQUFNLEVBQUU7WUFDMUIsT0FBTztnQkFDTCxVQUFVLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUNqQyxDQUFDO1NBQ0g7YUFBTTtZQUNMLGVBQU8sYUFBUCxlQUFPLHVCQUFQLGVBQU8sQ0FBRSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsT0FBTyxTQUFTLENBQUM7U0FDbEI7S0FDRjtJQUFDLFdBQU07UUFDTixlQUFPLGFBQVAsZUFBTyx1QkFBUCxlQUFPLENBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQXRCRCw0Q0FzQkM7QUFFRCxTQUFnQixZQUFZLENBQUMsT0FBZ0I7SUFDM0MsZUFBTyxhQUFQLGVBQU8sdUJBQVAsZUFBTyxDQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLFlBQVk7SUFDMUIsZUFBTyxhQUFQLGVBQU8sdUJBQVAsZUFBTyxDQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRkQsb0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc3RvcmFnZSA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogbG9jYWxTdG9yYWdlO1xuXG5pbnRlcmZhY2UgU2Vzc2lvbiB7XG4gIGlkZW50aWZpZXI6IHN0cmluZztcbn1cblxuY29uc3QgU0VTU0lPTl9LRVkgPSAnX190ZXJyYV9leHRlbnNpb25fcm91dGVyX3Nlc3Npb25fXyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yZWRTZXNzaW9uKCk6IFNlc3Npb24gfCB1bmRlZmluZWQge1xuICBjb25zdCBkYXRhID0gc3RvcmFnZT8uZ2V0SXRlbShTRVNTSU9OX0tFWSk7XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3Qgb2JqZWN0ID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIGlmICgnaWRlbnRpZmllcicgaW4gb2JqZWN0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZGVudGlmaWVyOiBvYmplY3RbJ2lkZW50aWZpZXInXSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JhZ2U/LnJlbW92ZUl0ZW0oU0VTU0lPTl9LRVkpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIHN0b3JhZ2U/LnJlbW92ZUl0ZW0oU0VTU0lPTl9LRVkpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3JlU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gIHN0b3JhZ2U/LnNldEl0ZW0oU0VTU0lPTl9LRVksIEpTT04uc3RyaW5naWZ5KHNlc3Npb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2Vzc2lvbigpIHtcbiAgc3RvcmFnZT8ucmVtb3ZlSXRlbShTRVNTSU9OX0tFWSk7XG59XG4iXX0=