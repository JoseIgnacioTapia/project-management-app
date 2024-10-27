"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const router = (0, express_1.Router)();
router.get('/', tasks_1.getTask);
router.post('/', tasks_1.postTask);
router.patch('/:id', tasks_1.patchTask);
exports.default = router;
//# sourceMappingURL=task.js.map