"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided' });
        return;
    }
    try {
        const secretKey = process.env.SECRETORPRIVATEKEY;
        if (!secretKey) {
            throw new Error('Secret key is not defined in enviroment variables');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authenticateJWT.js.map