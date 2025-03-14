import { synchronizeDatabase } from "../init";

beforeAll(async () => {
  await synchronizeDatabase();
});
