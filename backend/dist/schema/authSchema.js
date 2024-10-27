"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'The name is required' }),
    email: zod_1.z.string().email({ message: 'Invalid mail' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'The password must be at least 6 characters long' })
        .max(100, { message: 'Password cannot exceed 100 characters' }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'The password must be at least 6 characters long' })
        .max(100, { message: 'Password cannot exceed 100 characters' }),
});
//# sourceMappingURL=authSchema.js.map