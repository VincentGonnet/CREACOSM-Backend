import express, { Application } from "express";
import cors from "cors";
import startServer from "./init";

import gameRouter from "./routes/game.route";
import discoveriesRouter from "./routes/discoveries.route";
import ingredientsRouter from "./routes/ingredients.route";
import storageRouter from "./routes/storages.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/", gameRouter);
app.use("/", discoveriesRouter);
app.use("/", ingredientsRouter);
app.use("/", storageRouter);

startServer(app);
