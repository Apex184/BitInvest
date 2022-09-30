import { DataTypes, Model, UUIDV4 } from 'sequelize';
import db from '../config/db.config';
import { v4 as uuidv4 } from 'uuid';
import  {UserInstance}  from '../model/userSchema';



export interface UserAttributes {
  userId: string;
  paymentStatus: string;
  amount: number;
  plans: string;
  roi: number;
  dailyRoi: number;
}

export class InvestInstance extends Model<UserAttributes> {}

InvestInstance.init(
  {
    userId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false,
        
    },
    plans: {
        type: DataTypes.STRING,
    },
    paymentStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    roi:{
        type: DataTypes.NUMBER
    },
    dailyRoi:{
        type: DataTypes.NUMBER
    }
   
  },
  {
    sequelize: db,
    tableName: 'Investment',
  },
);

//Linking user to all accounts created by user
UserInstance.hasMany(InvestInstance, {foreignKey: 'userId'});
InvestInstance.belongsTo(UserInstance, {foreignKey: 'userId'});
