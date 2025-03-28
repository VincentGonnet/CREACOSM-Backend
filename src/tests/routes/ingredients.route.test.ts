import request from "supertest";
import express from "express";
import ingredientsRouter from "../../routes/ingredients.route";

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
    expect(response.body).toEqual({
      error: "Bad Request, expected group number",
    });
  });

  it("should analyze ingredient with valid data", async () => {
    const response = await request(app)
      .post("/analyze-ingredient")
      .send({ group: 1, ingredientId: 1, condition: "température", value: 20 })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ text: expect.any(String) });
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

  it("should analyze ingredient with text1.upperbound = text2.lowerbound ", async () => {
    const response = await request(app)
      .post("/analyze-ingredient")
      .send({ group: 1, ingredientId: 2, condition: "température", value: 26 })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ text: expect.any(String) });
  });

  it("should analyze ingredient with out of bound test value", async () => {
    const response = await request(app)
      .post("/analyze-ingredient")
      .send({
        group: 1,
        ingredientId: 2,
        condition: "température",
        value: 2000,
      })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
  });
});
