import { Sequelize, DataTypes } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sequelize = new Sequelize(databaseUrl);

export { sequelize, DataTypes };
