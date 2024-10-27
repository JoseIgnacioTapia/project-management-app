"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const CustomError_1 = require("../types/CustomError");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    // Zod validation error
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: err.errors.map((e) => ({
                field: e.path[0],
                message: e.message,
            })),
        });
    }
    // Specific errors with predefined HTTP codes
    if (err instanceof CustomError_1.CustomError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    // Generic error
    res.status(500).json({
        message: 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map