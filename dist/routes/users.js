"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const validateSignup_1 = require("../middleware/validateSignup");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/getuser');
router.post('/', validateSignup_1.validateSignupUser, userController_1.RegisterUser);
router.post('/login', validateSignup_1.validateLoginUser, userController_1.LoginUser);
router.patch('/verify/:token');
router.post('/forgotpassword');
router.post('/resetpassword/:token');
router.post('/updatepassword');
router.post('/updateprofile', auth_1.auth, validateSignup_1.validateUpdateUser, userController_1.UpdateUser);
router.post('/deleteaccount');
router.get('/logout');
exports.default = router;
//# sourceMappingURL=users.js.map