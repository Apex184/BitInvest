"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('app', 'root', '', {
    storage: process.env.NODE_ENV === 'test' ? './database_test.sqlite' : './bitInvest.sqlite',
    dialect: 'sqlite',
    logging: false,
});
exports.default = db;
//# sourceMappingURL=db.config.js.map