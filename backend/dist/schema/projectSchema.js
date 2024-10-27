"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    start_date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'The start date is not valid',
    }),
    end_date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'The end date is not valid',
    }),
    users: zod_1.z.array(zod_1.z.string()).optional(),
    tasks: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        description: zod_1.z.string().min(1, 'Description task is required'),
        state: zod_1.z.enum(['pending', 'in progress', 'completed']).optional(),
        assigned_to: zod_1.z.string().optional(),
    })),
});
exports.updateProjectSchema = exports.projectSchema.partial();
//# sourceMappingURL=projectSchema.js.map