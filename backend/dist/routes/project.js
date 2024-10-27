"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_1 = require("../controllers/projects");
const authorizeRole_1 = require("../middlewares/authorizeRole");
const router = (0, express_1.Router)();
router.get('/', projects_1.getProjects);
router.get('/:id', projects_1.getProject);
router.post('/', (0, authorizeRole_1.authorizeRoles)('ADMIN'), projects_1.postProject);
router.put('/:id', (0, authorizeRole_1.authorizeRoles)('ADMIN'), projects_1.putProject);
router.delete('/:id', projects_1.deleteProject);
exports.default = router;
//# sourceMappingURL=project.js.map