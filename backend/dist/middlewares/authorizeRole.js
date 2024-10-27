"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (req.user && typeof req.user !== 'string' && 'role' in req.user) {
            const { role } = req.user;
            if (!allowedRoles.includes(role)) {
                res.status(403).json({
                    message: 'You do not have permission to perform this action.',
                });
                return;
            }
            next();
        }
        else {
            res.status(403).json({
                message: 'Invalid token. User role not found',
            });
            return;
        }
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=authorizeRole.js.map