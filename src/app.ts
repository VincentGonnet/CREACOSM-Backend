import express, { Application } from "express";
import startServer from "./init";

import gameRouter from "./routes/game.route";
import discoveriesRouter from "./routes/discoveries.route";
import ingredientsRouter from "./routes/ingredients.route";

const app: Application = express();

app.use(express.json());
app.use("/", gameRouter);
app.use("/", discoveriesRouter);
app.use("/", ingredientsRouter);

startServer(app);
