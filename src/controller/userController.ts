import express,{Response, Request, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { UserInstance } from '../model/userSchema'
 import { v4 as uuidv4 } from 'uuid';
 import bcrypt from 'bcryptjs'
 import httpStatus from 'http-status'
 import { generateLoginToken } from '../utils/utils'
 import { errorResponse, serverError, successResponse, successResponseLogin } from '../utils/helperMethods';
 import mailer from '../mailer/mailSetup';
 import  {registermailverification}  from '../mailer/registerMailer';
 import { updatenotification } from '../mailer/updateMailer'
 
 const fromUser = process.env.FROM as string;
const jwtsecret = process.env.JWT_SECRET as string;
 


 interface jwtPayload {
    email: string;
    id: string;
    phoneNumber: Number;
  }
  
  export const RegisterUser = async (req: Request, res: Response): Promise<unknown> => {
    const userId = uuidv4();
    try {
      const duplicateEmail = await UserInstance.findOne({
        where: { email: req.body.email  },
      });
      if (duplicateEmail) {
        return errorResponse(res, 'Email already exists', httpStatus.CONFLICT);
      }
      const duplicatePhoneNumber = await UserInstance.findOne({
        where: { phoneNumber: req.body.phoneNumber },
      });
      if (duplicatePhoneNumber) {
        return errorResponse(res, 'Phone number already exists', httpStatus.CONFLICT);
      }
      const hashPassword = await bcrypt.hash(req.body.password, 10);
  
      const { fullName, email, phoneNumber, walletAddress, country, gender, password, userName, dob  } = req.body;
  
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
      const record = await UserInstance.create(user);
  
      const token = generateLoginToken({ userId, email });
      if (record) {
        const html = registermailverification(token);
        await mailer.sendEmail(fromUser, req.body.email, 'please verify your email', html);
      }
       return successResponse(res, 'User created successfully', httpStatus.CREATED, { ...record, token });
    } catch (error) {
      console.log(error);
      return serverError(res);
    }
  };
  
  export const LoginUser = async (req: Request, res: Response): Promise<unknown> => {
    try {
      const user = (await UserInstance.findOne({
        where:  { email: req.body.email },
      })) as unknown as { [key: string]: string };
      if (!user) {
        return errorResponse(res, 'Incorrect credentials', httpStatus.BAD_REQUEST);
      }
      const validUser = await bcrypt.compare(req.body.password, user.password );
      if (!validUser) {
        return errorResponse(res, 'Youa re not a valid user', httpStatus.BAD_REQUEST);
      }
      const { id, email} = user;
      const token = generateLoginToken({ id,  email});
    //   if(!user.isVerified){
    //     return errorResponse(res, 'Kindly verify your email', httpStatus.UNAUTHORIZED);
    //   }
      if (validUser) {
        
        return successResponseLogin(res, 'Login successfully', httpStatus.OK, user, token);
      }
    } catch (error) {
      console.log(error)
      return serverError(res);
    }
  };
  
  
  export async function UpdateUser(req: Request, res: Response) {
    try {
      const token = req.headers.token as string;
      const { id } = jwt.verify(token, jwtsecret) as jwtPayload;
      const { fullName,  phoneNumber, walletAddress,  userName, dob, avatar } = req.body;
  
      const data = await UserInstance.findOne({ where: { id } });
      if (!data) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
  
      const updateProfile = await data.update({
        fullName,
        phoneNumber,
        walletAddress,
        userName,
        dob,
        avatar,
      });
    
    //   const html = updatenotification({updateUser});
    //   await mailer.sendEmail(fromUser, req.body.email, 'Check your mail to see your updated record',html);
      successResponse(res, 'User updated successfully', httpStatus.CREATED, updateProfile);
    } catch (error) {
      console.log(error);
      return serverError(res);
    }
  }