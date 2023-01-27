export declare function isError<E extends Error>(error: unknown, errorType: {
    new (...args: any[]): E;
}): error is E;
