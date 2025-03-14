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

      if (
        storageConditionValue < lowerBound ||
        storageConditionValue > upperBound
      ) {
        return false;
      }
    }

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

export { isIngredientFitForStorage, getStorages };
