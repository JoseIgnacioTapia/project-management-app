"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWTUnless = void 0;
const authenticateJWT_1 = require("./authenticateJWT");
const excludeAuthPaths = ['/auth/login', '/auth/register', '/'];
const authenticateJWTUnless = (req, res, next) => {
    if (excludeAuthPaths.includes(req.path)) {
        return next();
    }
    (0, authenticateJWT_1.authenticateJWT)(req, res, next);
};
exports.authenticateJWTUnless = authenticateJWTUnless;
//# sourceMappingURL=authenticateJWTUnless.js.map