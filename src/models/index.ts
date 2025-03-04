import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

const db: { [key: string]: any } = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;