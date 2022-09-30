"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const userSchema_1 = require("../model/userSchema");
class InvestInstance extends sequelize_1.Model {
}
exports.InvestInstance = InvestInstance;
InvestInstance.init({
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    govtId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_config_1.default,
    tableName: 'Investment',
});
//Linking user to all accounts created by user
userSchema_1.UserInstance.hasMany(InvestInstance, { foreignKey: 'userId' });
InvestInstance.belongsTo(userSchema_1.UserInstance, { foreignKey: 'userId' });
//# sourceMappingURL=investSchema.js.map