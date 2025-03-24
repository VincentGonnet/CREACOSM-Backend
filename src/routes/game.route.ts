import { Router } from "express";
import startGame, { endGame } from "../controllers/game.controller";

const router = Router();

router.post("/start-game", startGame);
router.post("/end-game", endGame);

export default router;
