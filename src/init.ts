import sequelizeFixtures from "sequelize-fixtures";
import db from "./models";
import { Application } from "express";

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

async function loadStorage() {
  const storages = [
    {
      label: "Frigo",
      conditions: {
        température: 5,
        humidité: 50,
        luminosité: 0,
      },
    },
    {
      label: "Étagère",
      conditions: {
        température: 25,
        humidité: 65,
        luminosité: 500,
      },
    },
    {
      label: "Placard fermé",
      conditions: {
        température: 25,
        humidity: 10,
        luminosité: 0,
      },
    },
  ];

  await db.Storage.bulkCreate(storages);
}

async function synchronizeDatabase() {
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
      Condition: db.Condition,
    };

    await sequelizeFixtures.loadFile("src/fixtures/conditions.yml", models);
    await loadStorage(); // contains JSON data, cannot be loaded with sequelizeFixtures
    await sequelizeFixtures.loadFile("src/fixtures/ingredients.yml", models);
    await sequelizeFixtures.loadFile(
      "src/fixtures/ingredients-storage.yml",
      models
    );
    await sequelizeFixtures.loadFile("src/fixtures/texts.yml", models);

    console.log("Fixtures loaded");
  } catch (error) {
    console.error("Unable to synch the database :", error);
  }
}

async function startServer(app: Application) {
  await synchronizeDatabase();

  app.listen(3000, () => {
    console.log("Server is up and listening on port 3000");
  });
}

export default startServer;
export { authenticateDatabase, synchronizeDatabase };
