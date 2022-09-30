import Joi from 'joi';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

const secret = (process.env.JWT_SECRET as string) || 'examples';
console.log(secret);

export async function auth(req: Request | any, res: Response, next: NextFunction) {
    try{
        const token = req.headers.token;
        if(!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: 'Token is required',
            });
        }
        
        let verified = jwt.verify(token, secret);
        
        if(!verified) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: 'Invalid token',
            });
        }
        
        if(verified) {
            req.user = verified;
            next();
        }
        
        
    }
    catch(err){
        console.log(err);
    }
    
}
