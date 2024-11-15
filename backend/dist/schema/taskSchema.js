"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskStateSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
exports.taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    state: zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'),
    project_id: zod_1.z
        .number()
        .int()
        .positive('Project ID must be a positive integer'),
    assigned_to: zod_1.z.string().min(1, 'Assigned user ID is required'),
});
exports.taskStateSchema = zod_1.z.object({
    state: zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
});
//# sourceMappingURL=taskSchema.js.map