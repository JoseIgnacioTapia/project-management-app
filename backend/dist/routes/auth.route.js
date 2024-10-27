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
const express_1 = require("@auth/express");
const credentials_1 = __importDefault(require("@auth/express/providers/credentials"));
const express_2 = __importDefault(require("express"));
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from '@/utils/password';
const router = express_2.default.Router();
router.use('/*', (0, express_1.ExpressAuth)({
    providers: [
        (0, credentials_1.default)({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: (credentials) => __awaiter(void 0, void 0, void 0, function* () {
                let user = null;
                // logic to salt and hash password
                //   const pwHash = saltAndHashPassword(credentials.password);
                // logic to verify if the user exists
                //   user = await getUserFromDb(credentials.email, pwHash);
                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error('User not found.');
                }
                // return user object with the their profile data
                return user;
            }),
        }),
    ],
}));
exports.default = router;
//# sourceMappingURL=auth.route.js.map