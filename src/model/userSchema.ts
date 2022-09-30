import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import { KycInstance } from './kycSchema';


export interface UserAttributes {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  password: string;
  walletAddress: string;
  avatar?: string;
  isVerified?: boolean;
}


export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required',
        },
        notEmpty: {
          msg: 'Provide a first name',
        },
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        notNull: {
          msg: 'UserName is required',
        },
        notEmpty: {
          msg: 'Please provide a username',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required',
        },
        isEmail: {
          msg: 'Please provide a valid email',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'PhoneNumber is required',
        },
        isNumeric: {
          msg: 'Please provide a valid phone number',
        },
      },
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize: db,
    tableName: 'User',
  },
);

//Linking user to all accounts created by user
UserInstance.hasMany(KycInstance, {
  foreignKey: 'id',
  as: 'Kyc',
});

KycInstance.belongsTo(UserInstance, {
  foreignKey: 'userId',
  as: 'User',
});
//