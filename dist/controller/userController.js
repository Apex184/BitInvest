"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sign_up = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../model/userSchema");
const Sign_up = async (req, res, next) => {
    const { fullName, userName, email, phoneNumber, country, walletAddress, password } = req.body;
    try {
        const user = await userSchema_1.UserInstance.create({ fullName, userName, email, phoneNumber, country, walletAddress, password });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.send({ token });
    }
    catch (err) {
        return next(err);
    }
};
exports.Sign_up = Sign_up;
//# sourceMappingURL=userController.js.map