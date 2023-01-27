"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTxResult = void 0;
function findTxResult(values) {
    return values.find((value) => {
        return (value &&
            Array.isArray(value.msgs) &&
            'fee' in value &&
            'gasAdjustment' in value &&
            'result' in value &&
            'success' in value);
    });
}
exports.findTxResult = findTxResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC10eXBlcy90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFlQSxTQUFnQixZQUFZLENBQUMsTUFBYTtJQUN4QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQ0wsS0FBSztZQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUN6QixLQUFLLElBQUksS0FBSztZQUNkLGVBQWUsSUFBSSxLQUFLO1lBQ3hCLFFBQVEsSUFBSSxLQUFLO1lBQ2pCLFNBQVMsSUFBSSxLQUFLLENBQ25CLENBQUM7SUFDSixDQUFDLENBQXlCLENBQUM7QUFDN0IsQ0FBQztBQVhELG9DQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHhSZXN1bHQgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdHJpbmdpZmllZFR4UmVzdWx0IHtcbiAgZmVlOiBzdHJpbmc7XG4gIGdhc0FkanVzdG1lbnQ6IHN0cmluZztcbiAgaWQ6IG51bWJlcjtcbiAgbXNnczogc3RyaW5nW107XG4gIHJlc3VsdDoge1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIHJhd19sb2c6IHN0cmluZztcbiAgICB0eGhhc2g6IHN0cmluZztcbiAgfTtcbiAgc3VjY2VzczogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRUeFJlc3VsdCh2YWx1ZXM6IGFueVtdKTogVHhSZXN1bHQgfCB1bmRlZmluZWQge1xuICByZXR1cm4gdmFsdWVzLmZpbmQoKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHZhbHVlICYmXG4gICAgICBBcnJheS5pc0FycmF5KHZhbHVlLm1zZ3MpICYmXG4gICAgICAnZmVlJyBpbiB2YWx1ZSAmJlxuICAgICAgJ2dhc0FkanVzdG1lbnQnIGluIHZhbHVlICYmXG4gICAgICAncmVzdWx0JyBpbiB2YWx1ZSAmJlxuICAgICAgJ3N1Y2Nlc3MnIGluIHZhbHVlXG4gICAgKTtcbiAgfSkgYXMgVHhSZXN1bHQgfCB1bmRlZmluZWQ7XG59XG4iXX0=