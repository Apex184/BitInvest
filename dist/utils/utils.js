"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.kycSchema = exports.updateUserSchema = exports.changePasswordSchema = exports.generateLoginToken = exports.forgotPasswordSchema = exports.loginSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userSchema = joi_1.default.object({
    fullName: joi_1.default.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z ]*$")),
    userName: joi_1.default.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
    email: joi_1.default.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phoneNumber: joi_1.default.string().required().min(11).max(11).pattern(new RegExp("^[0-9]*$")),
    country: joi_1.default.string().required().min(3).max(50),
    gender: joi_1.default.string().required(),
    dob: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8).max(30).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")),
    walletAddress: joi_1.default.string().required().min(42).max(42).pattern(new RegExp("^(0x)[0-9a-fA-F]{40}$")),
    avatar: joi_1.default.string().optional().allow(""),
    isVerified: joi_1.default.boolean().optional().default(false)
}).with('password', 'confirmPassword');
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    userName: joi_1.default.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
});
exports.forgotPasswordSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    userName: joi_1.default.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
    phoneNumber: joi_1.default.string().required().min(11).max(11).pattern(new RegExp("^[0-9]*$")),
});
const generateLoginToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: '1d' });
};
exports.generateLoginToken = generateLoginToken;
exports.changePasswordSchema = joi_1.default.object()
    .keys({
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.any()
        .equal(joi_1.default.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
})
    .with('password', 'confirmPassword');
exports.updateUserSchema = joi_1.default.object().keys({
    fullName: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required().min(11).max(11).pattern(new RegExp("^[0-9]*$")),
    userName: joi_1.default.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
    dob: joi_1.default.string().required(),
    walletAddress: joi_1.default.string().required().min(42).max(42).pattern(new RegExp("^(0x)[0-9a-fA-F]{40}$")),
    avatar: joi_1.default.string(),
    country: joi_1.default.string().required().min(3).max(50)
});
exports.kycSchema = joi_1.default.object().keys({
    govId: joi_1.default.string().min(15).max(17).required(),
    state: joi_1.default.string().required()
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
};
//# sourceMappingURL=utils.js.map