"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Keep the right stack trace
        //if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
        //}
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map