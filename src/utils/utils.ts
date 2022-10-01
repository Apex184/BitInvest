import Joi from "joi";
import jwt from "jsonwebtoken";

export const userSchema = Joi.object({
    fullName: Joi.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z ]*$")),
    userName: Joi.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phoneNumber: Joi.string().required().min(11).max(11).pattern(new RegExp("^[0-9]*$")),
    country: Joi.string().required().min(3).max(50),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    password: Joi.string().required().min(5).max(30),
    confirmPassword: Joi.ref('password'),
    walletAddress: Joi.string().required().min(34).max(34).pattern(new RegExp("^[a-zA-Z0-9]*$")),
    avatar: Joi.string().optional().allow(""),
    isVerified: Joi.boolean().optional().default(false)
    
}).with('password', 'confirmPassword');

export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}),
    password: Joi.string().required(),
    userName: Joi.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
    phoneNumber: Joi.string().required().min(11).max(11).pattern(new RegExp("^[0-9]*$"))
});

export const forgotPasswordSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    userName: Joi.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
    phoneNumber: Joi.string().required().min(11).max(11).pattern(new RegExp("^[0-9]*$")),
  });

export const generateLoginToken = (user: { [key: string]: unknown }): string => {
    const pass = process.env.JWT_SECRET as string;
    return jwt.sign(user, pass, { expiresIn: '1d' });
  };

  export const changePasswordSchema = Joi.object()
  .keys({
    password: Joi.string().required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  })
  .with('password', 'confirmPassword');

export const updateUserSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  phoneNumber: Joi.string().required().min(11).max(11).pattern(new RegExp("^[0-9]*$")),
  userName: Joi.string().required().min(5).max(30).pattern(new RegExp("^[a-zA-Z0-9]*$")),
  dob: Joi.string().required(),
  walletAddress: Joi.string().required().min(34).max(34).pattern(new RegExp("^[a-zA-Z0-9]*$")),
  avatar: Joi.string(),
  country: Joi.string().required().min(3).max(50)
});

export const kycSchema = Joi.object().keys({
   govId: Joi.string().min(15).max(17).required(),
   state: Joi.string().required()
});   




export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
};
