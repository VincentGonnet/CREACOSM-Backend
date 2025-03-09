import { Router } from "express";
import { getIngredientsForGame } from "../controllers/ingredients.controller";

const router = Router();

router.post("/get-ingredients", getIngredientsForGame);

export default router;
