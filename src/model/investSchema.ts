// import { DataTypes, Model, UUIDV4 } from 'sequelize';
// import db from '../config/db.config';
// import { v4 as uuidv4 } from 'uuid';
// import  {UserInstance}  from '../model/userSchema';



// export interface UserAttributes {
//   userId: string;
//   govtId: string;
//   state: string;
// }

// export class InvestInstance extends Model<UserAttributes> {}

// UserInstance.init(
//   {
    // userId: {
    //   type: DataTypes.UUIDV4,
    //   primaryKey: true,
    //   allowNull: false,
//     // },
//     govtId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     state: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
   
//   },
//   {
//     sequelize: db,
//     tableName: 'Investment',
//   },
// );

// //Linking user to all accounts created by user
// UserInstance.hasMany(InvestInstance, {foreignKey: 'userId'});
// InvestInstance.belongsTo(UserInstance, {foreignKey: 'userId'});
