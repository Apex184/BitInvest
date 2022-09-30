"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const secret = process.env.JWT_SECRET || 'examples';
console.log(secret);
async function auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                status: http_status_1.default.UNAUTHORIZED,
                message: 'Kindly sign In as a user',
            });
        }
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                status: http_status_1.default.UNAUTHORIZED,
                message: 'Kindly verify your account',
            });
        }
        if (verified) {
            req.user = verified;
            next();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_1.default.FORBIDDEN).json({
            status: http_status_1.default.FORBIDDEN,
            message: 'User is not authorized',
        });
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map