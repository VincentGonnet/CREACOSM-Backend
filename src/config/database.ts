import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL as string);

const db: { [key: string]: any } = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

async function authenticateDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

authenticateDatabase();

export default sequelize;