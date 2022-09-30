"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const userSchema_1 = require("../model/userSchema");
class KycInstance extends sequelize_1.Model {
}
exports.KycInstance = KycInstance;
KycInstance.init({
    id: {
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
}, {
    sequelize: db_config_1.default,
    tableName: 'Kyc',
});
userSchema_1.UserInstance.hasOne(KycInstance, { foreignKey: 'id' });
KycInstance.belongsTo(userSchema_1.UserInstance, { foreignKey: 'id' });
//# sourceMappingURL=kycSchema.js.map