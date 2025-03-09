import { Router } from "express";
import {
  getIngredientsForGame,
  analyzeIngredient,
} from "../controllers/ingredients.controller";

const router = Router();

router.post("/get-ingredients", getIngredientsForGame);
router.post("/analyze-ingredient", analyzeIngredient);

export default router;
