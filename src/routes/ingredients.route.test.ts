import request from "supertest";
import express from "express";
import ingredientsRouter from "./ingredients.route";
import db from "../models";
import { synchronizeDatabase } from "../init";

const app = express();
app.use(express.json());
app.use("/", ingredientsRouter);

describe("Ingredients Routes", () => {
  it("should get ingredients for game with valid group", async () => {
    const response = await request(app)
      .post("/get-ingredients")
      .send({ group: 1 })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should return 400 for invalid group", async () => {
    const response = await request(app)
      .post("/get-ingredients")
      .send({ group: "invalid" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request, expected group number");
  });

  it("should analyze ingredient with valid data", async () => {
    const response = await request(app)
      .post("/analyze-ingredient")
      .send({ group: 1, ingredientId: 1, condition: "température", value: 25 })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .post("/analyze-ingredient")
      .send({
        group: "invalid",
        ingredientId: "invalid",
        condition: "température",
        value: "invalid",
      })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });
});
