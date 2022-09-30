"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const kycSchema_1 = require("./kycSchema");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    walletAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    sequelize: db_config_1.default,
    tableName: 'User',
});
//Linking user to all accounts created by user
UserInstance.hasMany(kycSchema_1.KycInstance, {
    foreignKey: 'id',
    as: 'Kyc',
});
kycSchema_1.KycInstance.belongsTo(UserInstance, {
    foreignKey: 'userId',
    as: 'User',
});
//
//# sourceMappingURL=userSchema.js.map