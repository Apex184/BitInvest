import express,{Response, Request, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { UserInstance } from '../model/userSchema'
 import { v4 as uuidv4 } from 'uuid';


export const Sign_up = async (req: Request, res: Response, next: NextFunction) => {
    const userId = uuidv4();
    const {fullName, userName,email,phoneNumber, country, walletAddress, password } = req.body;
    try {
        const user = {
            id: userId,
            fullName : fullName,
            userName : userName,
            email: email,
            phoneNumber: phoneNumber,
            country: country,
            walletAddress: walletAddress,
            password: password
        
        }
        // const record = await UserInstance.create(user);
        // const token = jwt.sign({ userId: user.id }, );
        // res.send({ token });
    } catch (err) {
        return next(err);
    }
}

