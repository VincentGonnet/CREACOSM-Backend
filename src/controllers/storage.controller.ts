import db from "../models";
import { Request, Response } from "express";

async function isIngredientFitForStorage(
  ingredientId: number,
  storageId: number
): Promise<boolean> {
  try {
    const storage = await db.Storage.findByPk(storageId);
    if (!storage) {
      throw new Error(`Storage with id ${storageId} not found`);
    }

    const ingredientStorages = await db.IngredientStorage.findAll({
      where: { idIngredient: ingredientId },
    });

    for (const ingredientStorage of ingredientStorages) {
      const condition = ingredientStorage.condition;
      const lowerBound = ingredientStorage.lowerBound;
      const upperBound = ingredientStorage.upperBound;
      const storageConditionValue = storage.conditions[condition];

      console.log(
        `Checking if ingredient with id ${ingredientStorage.idIngredient} fits in storage: ${condition} ${lowerBound} ${upperBound} vs storage value : ${storageConditionValue}`
      );

      if (
        storageConditionValue < lowerBound ||
        storageConditionValue > upperBound
      ) {
        console.log("Ingredient does not fit in storage");
        return false;
      }
    }

    console.log("Ingredient fits in storage");
    return true;
  } catch (error) {
    console.error("Error checking if ingredient fits in storage:", error);
    return false;
  }
}

async function getStorages(req: Request, res: Response) {
  try {
    const storages = await db.Storage.findAll();
    // send json response with id and label of storages
    const storageJson = storages.map((storage) => {
      return {
        id: storage.id,
        label: storage.label,
      };
    });
    res.status(200).json(storageJson);
  } catch (error) {
    console.error("Error while fetching storages:", error);
    res.status(500).send("Internal server error");
  }
}

async function tryStorage(req: Request, res: Response) {
  try {
    // Check if the request body is in JSON format
    if (!req.is("application/json")) {
      res.status(400).send("Content type must be application/json");
      return;
    }

    // check that the request body contains { "ingredientId": "number", "storageId": "number"}
    if (!req.body.ingredientId || !req.body.storageId) {
      res
        .status(400)
        .send("Bad Request, expected ingredient id and storage id");
      return;
    }

    // check if both ingredientId and storageId are numbers
    if (isNaN(req.body.ingredientId) || isNaN(req.body.storageId)) {
      res
        .status(400)
        .send("Bad Request, ingredientId and storageId must be numbers");
      return;
    }

    const ingredientId = req.body.ingredientId;
    const storageId = req.body.storageId;

    const isFit = await isIngredientFitForStorage(ingredientId, storageId);

    res.status(200).send(isFit);
  } catch (error) {
    console.error("Error while trying storage:", error);
    res.status(500).send("Internal server error");
  }
}

export { getStorages, tryStorage };
