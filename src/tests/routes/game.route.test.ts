import request from "supertest";
import express from "express";
import gameRouter from "../../routes/game.route";

const app = express();
app.use(express.json());
app.use("/", gameRouter);

describe("Game Routes", () => {
  it("should start the game with valid code", async () => {
    const response = await request(app)
      .post("/start-game")
      .send({ code: "1" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Game started");
  });
});
