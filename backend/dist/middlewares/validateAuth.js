"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const zod_1 = require("zod");
const validateAuth = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: 'Validation failed',
                errors: error.errors.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                })),
            });
        }
        else {
            next(error);
        }
    }
};
exports.validateAuth = validateAuth;
//# sourceMappingURL=validateAuth.js.map