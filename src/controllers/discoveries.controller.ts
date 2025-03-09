import { Request, Response } from "express";
import db from "../models";
import { Op } from "sequelize";

interface DiscoveredTableRow {
  condition: string;
  lowerBound: number;
  upperBound: number;
  message: string;
}

// request body example : { "group": "1", "ingredientId": "1" }
async function getDiscoveredTable(req: Request, res: Response) {
  // Check if the request body is in JSON format
  if (!req.is("application/json")) {
    res.status(400).send("Content type must be application/json");
    return;
  }

  // check that the request body contains { "group": "number", "ingredientId": "number" }
  if (!req.body.group || !req.body.ingredientId) {
    res
      .status(400)
      .send("Bad Request, expected group and ingredientId in the body");
    return;
  }

  // test if the group and ingredientId are numbers
  if (isNaN(req.body.group) || isNaN(req.body.ingredientId)) {
    res
      .status(400)
      .send("Bad Request, group and ingredientId should be numbers");
    return;
  }

  const gameId = req.body.group;
  const ingredientId = req.body.ingredientId;

  console.log(
    "Request to get discovered table for game :",
    gameId,
    "and ingredient :",
    ingredientId
  );

  // Find the Discovered table entry for the given game and ingredient
  db.Discovered.findAll({
    where: {
      groupId: gameId,
      textId: {
        [Op.in]: db.Sequelize.literal(
          `(SELECT id FROM texts WHERE "idIngredient" = ${ingredientId})`
        ),
      },
    },
  })
    .then(async (discovered) => {
      const discoveredTable: DiscoveredTableRow[] = [];

      for (const entry of discovered) {
        let text = await db.Text.findOne({
          where: {
            id: entry.textId,
          },
        });

        if (text) {
          discoveredTable.push({
            condition: text.condition,
            lowerBound: text.lowerBound,
            upperBound: text.upperBound,
            message: text.message,
          });
        }
      }

      res.status(200).json(discoveredTable);
      console.log("Discovered table sent successfully");
    })
    .catch((error) => {
      console.error(
        "Error occurred while fetching the discovered table :",
        error
      );
      res.status(500).send("Internal Server Error");
    });
}

export { getDiscoveredTable };
