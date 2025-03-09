import { Request, Response } from "express";

function startGame(req: Request, res: Response, next) {
  // TODO: modify the function to send a POST request to the game service to start the game, instead of replicating the logic here

  // Check if the request body is in JSON format
  if (!req.is("application/json")) {
    res.status(400).send("Content type must be application/json");
    return;
  }

  // parse the request body (json) that should contain { "code": "some-code" }
  // if the code is not present, return 400 Bad Request
  if (!req.body.code) {
    res.status(400).send("Bad Request");
    return;
  }

  // log the game code to the console
  console.log(req.body.code);

  // // Check if the Authorization header is present
  // // If not, return 401 Unauthorized
  // const authHeader = req.headers.authorization;
  // if (!authHeader) {
  //     res.status(401).send('Authorization header is missing');
  //     return;
  // }

  // // Split the Authorization header value by space
  // // If the length is not 3 or the first part is not 'Bearer', return 401 Unauthorized
  // const authParts = authHeader.split(' ');
  // if (authParts.length !== 3 || authParts[0] !== 'Bearer') {
  //     res.status(401).send('Invalid Authorization header format');
  //     return;
  // }

  // // Log the group code and word to the console
  // const [bearer, groupCode, word] = authParts;
  // console.log(`Number: ${groupCode}, Word: ${word}`);

  // Respond with the appropriate status code based on the game code
  switch (req.body.code) {
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
