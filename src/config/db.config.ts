import { Sequelize } from 'sequelize';

const db = new Sequelize('app', 'root', '', {
  storage: process.env.NODE_ENV === 'test' ? './database_test.sqlite' : './database.sqlite',
  dialect: 'sqlite',
  logging: false,
});

export default db;