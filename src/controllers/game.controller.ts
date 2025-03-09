import { Request, Response } from "express";
import db from "../models";

async function startGame(req: Request, res: Response, next) {
  // TODO: modify the function to send a POST request to the game service to start the game, instead of replicating the logic here

  // Check if the request body is in JSON format
  if (!req.is("application/json")) {
    res.status(400).send("Content type must be application/json");
    return;
  }

  // check that the request body contains { "code": "some-code" }
  if (!req.body.code) {
    res.status(400).send("Bad Request");
    return;
  }

  const gameCode = req.body.code;

  console.log("Game start request with game code :", gameCode);

  // Respond with the appropriate status code based on the game code
  switch (gameCode) {
    case "1":
      res.status(200).send("Game started");
      break;
    case "2":
      res.status(401).send("Unauthorized");
      break;
    case "3":
      res.status(500).send("Internal Server Error");
      break;
    default:
      res.status(400).send("Bad Request");
      break;
  }

  // Create a new game in the database
  db.Game.findOrCreate({
    where: {
      groupId: gameCode,
    },
    defaults: {
      groupId: gameCode,
    },
  })
    .then(([game, created]) => {
      if (created) {
        console.log("Game created with game code :", game.groupId);
      } else {
        console.log("Game already exists with game code :", game.groupId);
      }
    })
    .catch((error) => {
      console.error("Error occurred while creating the game :", error);
    });
}

function endGame(completed: boolean) {
  // TODO: send a POST request to the game service to end the game

  if (completed) {
    console.log("Game completed");
  } else {
    console.log("Game not completed");
  }
}

export default startGame;
export { endGame };
