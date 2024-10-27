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
exports.deleteProject = exports.putProject = exports.postProject = exports.getProject = exports.getProjects = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const projectSchema_1 = require("../schema/projectSchema");
const zod_1 = require("zod");
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma_1.default.project.findMany({
            where: {
                status: 1,
            },
            include: {
                users: true,
                tasks: true,
            },
        });
        res.status(200).json(projects);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            message: 'Error fetching projects',
        });
    }
});
exports.getProjects = getProjects;
const getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const projectId = Number(id);
        if (isNaN(projectId)) {
            res.status(400).json({ message: 'Invalid project ID' });
        }
        const project = yield prisma_1.default.project.findUnique({
            where: { id: projectId, status: 1 },
            include: {
                users: true,
                tasks: true,
            },
        });
        if (!project) {
            res.status(404).json({ message: 'Project not found or inactive' });
        }
        res.status(200).json({ project });
    }
    catch (error) {
        next(error);
    }
});
exports.getProject = getProject;
const postProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = projectSchema_1.projectSchema.parse(req.body);
        const { name, description, start_date, end_date, users, tasks } = validatedData;
        const existingProject = yield prisma_1.default.project.findFirst({
            where: { name },
        });
        if (existingProject) {
            res.status(409).json({ message: 'Name Project is already registered' });
            return;
        }
        const newProject = yield prisma_1.default.project.create({
            data: {
                name,
                description,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                users: {
                    create: (users === null || users === void 0 ? void 0 : users.map((userId) => ({
                        user: { connect: { id: userId } },
                    }))) || [],
                },
                tasks: {
                    create: (tasks === null || tasks === void 0 ? void 0 : tasks.map((task) => ({
                        title: task.title,
                        description: task.decription,
                        state: task.state || 'PENDING',
                        assigned_to: task.assigned_to,
                    }))) || [],
                },
            },
            include: {
                users: true,
            },
        });
        res
            .status(201)
            .json({ message: 'Project created successfully', project: newProject });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                message: 'Validation failed',
                errors: error.errors.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                })),
            });
        }
        next(error);
    }
});
exports.postProject = postProject;
const putProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const validateData = projectSchema_1.projectSchema
            .omit({ tasks: true, users: true })
            .parse(req.body);
        const existingProject = yield prisma_1.default.project.findUnique({
            where: { id: parseInt(id), status: 1 },
        });
        if (!existingProject) {
            res.status(404).json({ message: 'Project not found or inactive' });
            return;
        }
        const updatedProject = yield prisma_1.default.project.update({
            where: { id: parseInt(id) },
            data: {
                name: validateData.name,
                description: validateData.description,
                start_date: new Date(validateData.start_date),
                end_date: new Date(validateData.end_date),
            },
        });
        res.status(200).json({
            message: 'Project updated successfully',
            project: updatedProject,
        });
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
        next(error);
    }
});
exports.putProject = putProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existingProject = yield prisma_1.default.project.findUnique({
            where: { id: parseInt(id), status: 1 },
        });
        if (!existingProject) {
            res
                .status(404)
                .json({ message: 'Project not found or already inactive' });
            return;
        }
        const updatedProject = yield prisma_1.default.project.update({
            where: { id: parseInt(id) },
            data: { status: 0 },
        });
        res.status(200).json({
            message: 'Project marked as inactive successfully',
            project: updatedProject,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=projects.js.map