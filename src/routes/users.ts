import  express, {Response, Request, NextFunction} from 'express'
import { RegisterUser, LoginUser, UpdateUser } from '../controller/userController';
import { auth } from '../middleware/auth';
import { validateSignupUser, validateLoginUser, validateUpdateUser } from '../middleware/validateSignup';
const router = express.Router();

/* GET users listing. */
router.get('/getuser');
router.post('/', validateSignupUser, RegisterUser);
router.post('/login', validateLoginUser, LoginUser);
router.patch('/verify/:token', );
router.post('/forgotpassword', );
router.post('/resetpassword/:token', );
router.post('/updatepassword', );
router.post('/updateprofile',auth, validateUpdateUser, UpdateUser);
router.post('/deleteaccount', );
router.get('/logout', );



export default router;
