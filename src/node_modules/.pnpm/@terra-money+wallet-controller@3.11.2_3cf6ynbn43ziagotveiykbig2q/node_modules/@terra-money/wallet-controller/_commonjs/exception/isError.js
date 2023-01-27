"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = void 0;
function isError(error, errorType) {
    try {
        return (
        //@ts-ignore
        error instanceof errorType || error.constructor.name === errorType.name);
    }
    catch (_a) {
        return false;
    }
}
exports.isError = isError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AdGVycmEtbW9uZXkvd2FsbGV0LWNvbnRyb2xsZXIvZXhjZXB0aW9uL2lzRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsT0FBTyxDQUNyQixLQUFjLEVBQ2QsU0FBc0M7SUFFdEMsSUFBSTtRQUNGLE9BQU87UUFDTCxZQUFZO1FBQ1osS0FBSyxZQUFZLFNBQVMsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsSUFBSSxDQUN4RSxDQUFDO0tBQ0g7SUFBQyxXQUFNO1FBQ04sT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUM7QUFaRCwwQkFZQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpc0Vycm9yPEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGVycm9yOiB1bmtub3duLFxuICBlcnJvclR5cGU6IHsgbmV3ICguLi5hcmdzOiBhbnlbXSk6IEUgfSxcbik6IGVycm9yIGlzIEUge1xuICB0cnkge1xuICAgIHJldHVybiAoXG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIGVycm9yIGluc3RhbmNlb2YgZXJyb3JUeXBlIHx8IGVycm9yLmNvbnN0cnVjdG9yLm5hbWUgPT09IGVycm9yVHlwZS5uYW1lXG4gICAgKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=