import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import  {UserInstance}  from '../model/userSchema';
// import  {InvestInstance}  from '../model/investSchema';


export interface UserAttributes {
  id: string;
  govtId: string;
  state: string;

  
  avatar?: string;
  isVerified?: boolean;
}

export class KycInstance extends Model<UserAttributes> {}

KycInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    govtId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
  },
  {
    sequelize: db,
    tableName: 'Kyc',
  },
);


