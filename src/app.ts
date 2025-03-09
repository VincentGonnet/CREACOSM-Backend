import express, { Application } from "express";
import db from "./models";
import gameRouter from "./routes/game.route";
import sequelizeFixtures from "sequelize-fixtures";

const app: Application = express();

app.use(express.json());
app.use("/", gameRouter);

async function authenticateDatabase(retries = 5, delay = 3000) {
  while (retries > 0) {
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
      break;
    } catch (error) {
      console.error("Unable to connect to the database");
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (retries === 0) {
        console.error("All retries exhausted. Exiting.");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

async function startServer() {
  try {
    // Wait for database connection
    await authenticateDatabase();

    // Synchronize models with database
    await db.sequelize.sync({ force: true, logging: false });
    console.log("Database synchronized");

    const models = {
      Ingredient: db.Ingredient,
      Storage: db.Storage,
      Text: db.Text,
      IngredientStorage: db.IngredientStorage,
      Discovered: db.Discovered,
      Game: db.Game,
    };

    await sequelizeFixtures.loadFile("src/fixtures/*.yml", models);
    console.log("Fixtures loaded");

    // Start the server
    app.listen(3000, () => {
      console.log("Server is up and listening on port 3000");
    });
  } catch (error) {
    console.error("Unable to start the server :", error);
  }
}

startServer();
