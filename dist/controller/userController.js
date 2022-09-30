"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sign_up = void 0;
const userSchema_1 = require("../model/userSchema");
const uuid_1 = require("uuid");
const Sign_up = async (req, res, next) => {
    const userId = (0, uuid_1.v4)();
    const { fullName, userName, email, phoneNumber, country, walletAddress, password } = req.body;
    try {
        const user = {
            id: userId,
            fullName: fullName,
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            country: country,
            walletAddress: walletAddress,
            password: password
        };
        const record = await userSchema_1.UserInstance.create(user);
        // const token = jwt.sign({ userId: user.id }, );
        // res.send({ token });
    }
    catch (err) {
        return next(err);
    }
};
exports.Sign_up = Sign_up;
//# sourceMappingURL=userController.js.map