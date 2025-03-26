import { Request, Response } from "express";
import fetch from "node-fetch";
import db from "../models";

async function startGame(req: Request, res: Response) {
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

  fetch(`${process.env.BAAS_URL}/start-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ORDRE_PASSAGE} ${process.env.PASSWORD}`,
    },
    body: JSON.stringify({ code: gameCode }),
  })
    .then((response) => {
      if (response.ok) {
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
        console.log("Game started with game code :", gameCode);
        res.status(200).json({ message: "Game started" });
      } else {
        console.error(
          "Error occurred while starting the game :",
          response.statusText
        );
        res
          .status(500)
          .json({ error: `Internal Server Error : ${response.statusText}` });
      }
    })
    .catch((error) => {
      console.error("Error occurred while starting the game :", error);
      res.status(500).json({ error: "Internal Server Error" });
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

  console.log("Game end request with game code :", gameCode);

  fetch(`${process.env.BAAS_URL}/end-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ORDRE_PASSAGE} ${process.env.PASSWORD} ${gameCode}`,
    },
    body: JSON.stringify({ completed: true }),
  }).then((response) => {
    if (response.ok) {
      res.status(200).json({ message: "Game ended" });
    } else {
      console.error(
        "Error occurred while ending the game :",
        response.statusText
      );
      res
        .status(500)
        .json({ error: `Internal Server Error : ${response.statusText}` });
    }
  });
}

export default startGame;
export { endGame };
