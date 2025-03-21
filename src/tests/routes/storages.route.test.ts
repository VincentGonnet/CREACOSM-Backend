import request from "supertest";
import express from "express";
import storageRouter from "../../routes/storages.route";
import db from "../../models";
import { synchronizeDatabase } from "../../init";

const app = express();
app.use(express.json());
app.use("/", storageRouter);

describe("Storage Routes", () => {
  it("should get all storages", async () => {
    const response = await request(app)
      .get("/get-storages")
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          label: expect.any(String),
        }),
      ])
    );
  });

  it("should check if an ingredient fits in a storage", async () => {
    const response = await request(app)
      .post("/try-storage")
      .send({ ingredientId: 1, storageId: 3 })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ correct: true });
  });

  it("should return false if an ingredient does not fit in a storage", async () => {
    const response = await request(app)
      .post("/try-storage")
      .send({ ingredientId: 1, storageId: 1 })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ correct: false });
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .post("/try-storage")
      .send({ ingredientId: "invalid", storageId: "invalid" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });
});
