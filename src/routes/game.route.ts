import { Router } from "express";
import startGame from "../controllers/game.controller";
import { getDiscoveredTable } from "../controllers/discoveries.controller";

const router = Router();

router.post("/start-game", startGame);

export default router;
