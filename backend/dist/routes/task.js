"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const authorizeRole_1 = require("../middlewares/authorizeRole");
const router = (0, express_1.Router)();
router.get('/', tasks_1.getTasksByProject);
router.post('/', (0, authorizeRole_1.authorizeRoles)('ADMIN'), tasks_1.postTask);
router.patch('/:id', tasks_1.patchTask);
exports.default = router;
//# sourceMappingURL=task.js.map