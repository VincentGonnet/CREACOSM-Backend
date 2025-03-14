import { Request, Response } from "express";
import { Op } from "sequelize";
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
    if (!req.body.group || isNaN(req.body.group)) {
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

async function analyzeIngredient(req: Request, res: Response) {
  try {
    // Check if the request body is in JSON format
    if (!req.is("application/json")) {
      res.status(400).send("Content type must be application/json");
      return;
    }

    // check that the request body contains { "group": "number", "ingredientId": "number", "condition": "string", "value": "number"}
    if (
      !req.body.group ||
      !req.body.ingredientId ||
      !req.body.condition ||
      !req.body.value
    ) {
      res
        .status(400)
        .send(
          "Bad Request, expected group number, ingredient id, condition and value"
        );
      return;
    }

    if (
      isNaN(req.body.group) ||
      isNaN(req.body.ingredientId) ||
      isNaN(req.body.value)
    ) {
      res
        .status(400)
        .send("Bad Request, group, ingredientId and value must be numbers");
      return;
    }

    const gameId = req.body.group;
    const ingredientId = req.body.ingredientId;
    const condition = req.body.condition;
    const value = parseInt(req.body.value);

    console.log(
      `Request to analyze ingredient ${ingredientId} for game ${gameId} with condition ${condition} and value ${value}`
    );

    // try to find, in texts, the ingredient with the given id and condition, and the given value between lowerBound and upperBound
    let text = await db.Text.findOne({
      where: {
        idIngredient: ingredientId,
        condition: condition,
        lowerBound: {
          [Op.lte]: value,
        },
        upperBound: {
          [Op.gte]: value,
        },
      },
    });

    // if no text is found, create a text entry in the database
    if (!text) {
      text = await db.Text.create({
        idIngredient: ingredientId,
        condition: condition,
        lowerBound: value,
        upperBound: value,
        message: "L'ingrédient se porte très mal.",
      });
      console.log(
        "Value out of bounds for this condition, new placeholder text created"
      );
    }

    // add the text to the discovered table
    await db.Discovered.create({
      groupId: gameId,
      textId: text.id,
    });
    console.log("Text added to discovered table");

    res.status(200).send(text.message);
    console.log("Analysis done, response sent");
  } catch (error) {
    console.error("Error while analyzing ingredient :", error);
    res.status(500).send("Internal server error");
  }
}

export { getIngredientsForGame, analyzeIngredient };
