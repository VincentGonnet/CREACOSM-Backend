import db from "../models";
import { synchronizeDatabase } from "../init";

beforeAll(async () => {
  await synchronizeDatabase();
});

afterAll(async () => {
  await db.sequelize.close();
});
