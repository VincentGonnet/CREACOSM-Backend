import { Request, Response } from "express";
import db from "../models";
import Ingredient from "../models/ingredient";

async function getIngredientsForGame(req: Request, res: Response) {
  try {
    // Check if the request body is in JSON format
    if (!req.is("application/json")) {
      res.status(400).send("Content type must be application/json");
      return;
    }

    // check that the request body contains { "group": "number"}
    if (!req.body.group) {
      res.status(400).send("Bad Request, expected group number");
      return;
    }

    const gameId = req.body.group;
    console.log("Request to get ingredients for game :", gameId);

    const groupIngredients = await db.GameIngredient.findAll({
      where: {
        groupId: gameId,
      },
    });

    const ingredients: Ingredient[] = [];

    for (const entry of groupIngredients) {
      const ingredient = await db.Ingredient.findByPk(entry.ingredientId);
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    res.status(200).send(ingredients);
  } catch (error) {
    console.error("Error while fetching ingredients for game :", error);
    res.status(500).send("Internal server error");
  }
}

export { getIngredientsForGame };
