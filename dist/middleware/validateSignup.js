"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChangePassword = exports.validateForgotPassword = exports.validateUpdateUser = exports.validateLoginUser = exports.validateSignupUser = void 0;
const utils_1 = require("../utils/utils");
const validateSignupUser = (req, res, next) => {
    const validateUser = utils_1.userSchema.validate(req.body, utils_1.options);
    if (validateUser.error) {
        return res.status(400).json({
            status: 400,
            message: validateUser.error.details[0].message,
        });
    }
    next();
};
exports.validateSignupUser = validateSignupUser;
const validateLoginUser = (req, res, next) => {
    const validateResult = utils_1.loginSchema.validate(req.body, utils_1.options);
    if (validateResult.error) {
        return res.status(400).json({
            status: 400,
            message: validateResult.error.details[0].message,
        });
    }
    next();
};
exports.validateLoginUser = validateLoginUser;
const validateUpdateUser = (req, res, next) => {
    const validateUser = utils_1.updateUserSchema.validate(req.body, utils_1.options);
    if (validateUser.error) {
        return res.status(400).json({
            message: validateUser.error.details[0].message,
        });
    }
    next();
};
exports.validateUpdateUser = validateUpdateUser;
const validateForgotPassword = (req, res, next) => {
    const validateResult = utils_1.forgotPasswordSchema.validate(req.body, utils_1.options);
    if (validateResult.error) {
        return res.status(400).json({ message: validateResult.error.details[0].message });
    }
    next();
};
exports.validateForgotPassword = validateForgotPassword;
const validateChangePassword = (req, res, next) => {
    const validateResult = utils_1.changePasswordSchema.validate(req.body, utils_1.options);
    if (validateResult.error) {
        return res.status(400).json({
            message: validateResult.error.details[0].message,
        });
    }
    next();
};
exports.validateChangePassword = validateChangePassword;
//# sourceMappingURL=validateSignup.js.map