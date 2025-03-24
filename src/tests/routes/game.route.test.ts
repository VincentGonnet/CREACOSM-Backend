import request from "supertest";
import express from "express";
import gameRouter from "../../routes/game.route";

const app = express();
app.use(express.json());
app.use("/", gameRouter);

describe("Game Routes", () => {
  it("should start the game with valid code", async () => {
    const randomCode = Math.floor(Math.random() * 51).toString(); // Ensure code is a string
    const response = await request(app)
      .post("/start-game")
      .send({ code: randomCode })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Game started" });
  });

  it("should return 400 for invalid request body", async () => {
    const response = await request(app)
      .post("/start-game")
      .send({ invalid: "invalid" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Bad Request" });
  });

  it("should end the game with valid code", async () => {
    const randomCode = Math.floor(Math.random() * 51).toString(); // Ensure code is a string
    const response = await request(app)
      .post("/end-game")
      .send({ code: randomCode })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Game ended" });
  });

  it("should return 400 for invalid request body", async () => {
    const response = await request(app)
      .post("/end-game")
      .send({ invalid: "invalid" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Bad Request" });
  });

  it("should return 400 for invalid content type", async () => {
    const response = await request(app)
      .post("/end-game")
      .send("1")
      .set("Content-Type", "text/plain");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Content type must be application/json",
    });
  });

  it("should return 400 for invalid code", async () => {
    const response = await request(app)
      .post("/end-game")
      .send({ code: "invalid" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Bad Request" });
  });
});
