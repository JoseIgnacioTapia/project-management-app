"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTask = exports.postTask = exports.getTasksByProject = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const taskSchema_1 = require("../schema/taskSchema");
const zod_1 = require("zod");
const getTasksByProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.query;
        const projectId = parseInt(project_id);
        if (isNaN(projectId)) {
            res.status(400).json({ message: 'Invalid project ID' });
            return;
        }
        const projectExists = yield prisma_1.default.project.findUnique({
            where: { id: projectId },
        });
        if (!projectExists) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        // Get Tasks by Project
        const tasks = yield prisma_1.default.task.findMany({
            where: { project_id: projectId },
            include: {
                user: true,
            },
        });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks', error);
        next(error);
    }
});
exports.getTasksByProject = getTasksByProject;
const postTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = taskSchema_1.taskSchema.parse(req.body);
        const { title, description, state, project_id, assigned_to } = validatedData;
        const projectExists = yield prisma_1.default.project.findUnique({
            where: { id: project_id },
        });
        if (!projectExists) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        const userExists = yield prisma_1.default.user.findUnique({
            where: { id: assigned_to },
        });
        if (!userExists) {
            res.status(404).json({ message: 'Assigned user not found' });
            return;
        }
        // Check if a task with the same title already exists in the project
        const existingTask = yield prisma_1.default.task.findFirst({
            where: {
                title,
                project_id,
            },
        });
        if (existingTask) {
            res.status(409).json({
                message: 'A task with the same title already exists in this project',
            });
            return;
        }
        // Create task
        const newTask = yield prisma_1.default.task.create({
            data: {
                title,
                description,
                state,
                project: { connect: { id: project_id } },
                user: { connect: { id: assigned_to } },
            },
        });
        // Update the ProjectUser table to reflect the user's assignment to the project
        yield prisma_1.default.projectUser.upsert({
            where: {
                user_id_project_id: {
                    user_id: assigned_to,
                    project_id: project_id,
                },
            },
            update: {},
            create: {
                user_id: assigned_to,
                project_id: project_id,
            },
        });
        res
            .status(201)
            .json({ message: 'Task created succesfully', task: newTask });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: 'Validation failed',
                errors: error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }
        else {
            next(error);
        }
    }
});
exports.postTask = postTask;
const patchTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validatedData = taskSchema_1.taskStateSchema.parse(req.body);
        const { state } = validatedData;
        const existingTask = yield prisma_1.default.task.findUnique({
            where: { id: parseInt(id, 10) },
        });
        if (!existingTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        const updatedTask = yield prisma_1.default.task.update({
            where: { id: parseInt(id, 10) },
            data: { state },
        });
        res.status(200).json({
            message: 'Task state updated successfully',
            task: updatedTask,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: 'Invalid request body',
                errors: error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }
        else {
            next(error);
        }
    }
});
exports.patchTask = patchTask;
//# sourceMappingURL=tasks.js.map