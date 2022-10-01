"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.LoginUser = exports.RegisterUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../model/userSchema");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_1 = __importDefault(require("http-status"));
const utils_1 = require("../utils/utils");
const helperMethods_1 = require("../utils/helperMethods");
const mailSetup_1 = __importDefault(require("../mailer/mailSetup"));
const registerMailer_1 = require("../mailer/registerMailer");
const fromUser = process.env.FROM;
const jwtsecret = process.env.JWT_SECRET;
const RegisterUser = async (req, res) => {
    const userId = (0, uuid_1.v4)();
    try {
        const duplicateEmail = await userSchema_1.UserInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicateEmail) {
            return (0, helperMethods_1.errorResponse)(res, 'Email already exists', http_status_1.default.CONFLICT);
        }
        const duplicatePhoneNumber = await userSchema_1.UserInstance.findOne({
            where: { phoneNumber: req.body.phoneNumber },
        });
        if (duplicatePhoneNumber) {
            return (0, helperMethods_1.errorResponse)(res, 'Phone number already exists', http_status_1.default.CONFLICT);
        }
        const hashPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        const { fullName, email, phoneNumber, walletAddress, country, gender, password, userName, dob } = req.body;
        const user = {
            id: userId,
            fullName,
            dob,
            email,
            phoneNumber,
            walletAddress,
            country,
            gender,
            userName,
            password: hashPassword,
        };
        const record = await userSchema_1.UserInstance.create(user);
        const token = (0, utils_1.generateLoginToken)({ userId, email });
        if (record) {
            const html = (0, registerMailer_1.registermailverification)(token);
            await mailSetup_1.default.sendEmail(fromUser, req.body.email, 'please verify your email', html);
        }
        return (0, helperMethods_1.successResponse)(res, 'User created successfully', http_status_1.default.CREATED, { ...record, token });
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.RegisterUser = RegisterUser;
const LoginUser = async (req, res) => {
    try {
        const user = (await userSchema_1.UserInstance.findOne({
            where: { email: req.body.email },
        }));
        if (!user) {
            return (0, helperMethods_1.errorResponse)(res, 'Incorrect credentials', http_status_1.default.BAD_REQUEST);
        }
        const validUser = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validUser) {
            return (0, helperMethods_1.errorResponse)(res, 'Youa re not a valid user', http_status_1.default.BAD_REQUEST);
        }
        const { id, email } = user;
        const token = (0, utils_1.generateLoginToken)({ id, email });
        //   if(!user.isVerified){
        //     return errorResponse(res, 'Kindly verify your email', httpStatus.UNAUTHORIZED);
        //   }
        if (validUser) {
            return (0, helperMethods_1.successResponseLogin)(res, 'Login successfully', http_status_1.default.OK, user, token);
        }
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.LoginUser = LoginUser;
async function UpdateUser(req, res) {
    try {
        const token = req.headers.token;
        const { id } = jsonwebtoken_1.default.verify(token, jwtsecret);
        const { fullName, phoneNumber, walletAddress, userName, dob, avatar } = req.body;
        const data = await userSchema_1.UserInstance.findOne({ where: { id } });
        if (!data) {
            return res.status(http_status_1.default.NOT_FOUND).json({ message: 'User not found' });
        }
        const updateProfile = await data.update({
            fullName,
            phoneNumber,
            walletAddress,
            userName,
            dob,
            avatar,
        });
        //   const html = updatenotification("Your profile has been updated");
        //   await mailer.sendEmail(fromUser, req.body.email, 'Check your mail to see your updated record',html);
        (0, helperMethods_1.successResponse)(res, 'User updated successfully', http_status_1.default.CREATED, updateProfile);
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
}
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=userController.js.map