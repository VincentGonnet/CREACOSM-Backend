import { Request, Response } from "express";
import db from "../models";

async function startGame(req: Request, res: Response) {
  // TODO: modify the function to send a POST request to the game service to start the game, instead of replicating the logic here

  // Check if the request body is in JSON format
  if (!req.is("application/json")) {
    res.status(400).json({ error: "Content type must be application/json" });
    return;
  }

  // check that the request body contains { "code": "some-code" }
  if (!req.body.code) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  // check that the code is a number
  if (isNaN(parseInt(req.body.code))) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  const gameCode = req.body.code;

  console.log("Game start request with game code :", gameCode);

  res.status(200).json({ message: "Game started" });

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

async function endGame(req: Request, res: Response) {
  // Check if the request body is in JSON format
  if (!req.is("application/json")) {
    res.status(400).json({ error: "Content type must be application/json" });
    return;
  }

  // check that the request body contains { "code": "some-code" }
  if (!req.body.code) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  // check that the code is a number
  if (isNaN(parseInt(req.body.code))) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  const gameCode = req.body.code;

  console.log("Game start request with game code :", gameCode);

  // TODO: send a POST request to the game service to end the game

  res.status(200).json({ message: "Game ended" });
}

export default startGame;
export { endGame };
