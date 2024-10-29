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
exports.patchTask = exports.postTask = exports.getTask = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const taskSchema_1 = require("../schema/taskSchema");
const zod_1 = require("zod");
const getTask = (req, res) => {
    const { project_id } = req.query;
    //   if (!project_id) {
    //     return res.status(400).json({
    //       msg: 'Project ID is required to filter tasks',
    //     });
    //   }
    // La lógica para obtener las tareas por project_id desde la base de datos.
    res.json({
        msg: 'getTask',
        project_id,
        // Las tareas filtradas:
        tasks: [], // Array de las tareas filtradas por project_id
    });
};
exports.getTask = getTask;
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
const patchTask = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'patchTask',
        id,
        body,
    });
};
exports.patchTask = patchTask;
//# sourceMappingURL=tasks.js.map