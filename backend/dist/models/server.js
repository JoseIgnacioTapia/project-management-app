"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const project_1 = __importDefault(require("../routes/project"));
const task_1 = __importDefault(require("../routes/task"));
const auth_1 = __importDefault(require("../routes/auth"));
const authenticateJWTUnless_1 = require("../middlewares/authenticateJWTUnless");
class Server {
    constructor() {
        this.apiPaths = {
            projects: '/projects',
            tasks: '/tasks',
            auth: '/auth',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
        this.handleErrors();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Body lecture
        this.app.use(express_1.default.json());
        // Cookie Parser
        this.app.use((0, cookie_parser_1.default)());
        // Global Authentication
        this.app.use(authenticateJWTUnless_1.authenticateJWTUnless);
    }
    routes() {
        this.app.use(this.apiPaths.projects, project_1.default);
        this.app.use(this.apiPaths.tasks, task_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
    }
    handleErrors() {
        // Route Not Found Hangled Error
        this.app.use((req, res, next) => {
            res.status(404).json({
                message: 'Resource not found',
            });
        });
        // General Server Errors
        this.app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error!',
            });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map