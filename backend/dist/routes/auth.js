"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateAuth_1 = require("../middlewares/validateAuth");
const authSchema_1 = require("../schema/authSchema");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/login', (0, validateAuth_1.validateAuth)(authSchema_1.loginSchema), auth_1.login);
router.post('/register', (0, validateAuth_1.validateAuth)(authSchema_1.registerSchema), auth_1.register);
router.post('/logout', auth_1.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map