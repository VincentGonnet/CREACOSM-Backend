import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://user:password@localhost:5432/creacosm"
);

const db: { [key: string]: any } = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default sequelize;
