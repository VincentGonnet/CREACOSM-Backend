import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL as string);

const db: { [key: string]: any } = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default sequelize;