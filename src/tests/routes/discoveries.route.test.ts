import request from "supertest";
import express from "express";
import router from "../../routes/discoveries.route";

const app = express();
app.use(express.json());
app.use("/", router);

describe("Game Routes", () => {
  it("should get discovered table", async () => {
    const response = await request(app)
      .post("/get-discovered-table")
      .send({
        group: "1",
        ingredientId: "1",
        Headers: {
          "Content-Type": "application/json",
        },
      });
    expect(response.status).toBe(200);

    if (response.body.length === 0) {
      expect(response.body).toEqual([]);
    } else {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            condition: expect.any(String),
            unit: expect.any(String),
            lowerBound: expect.any(Number),
            upperBound: expect.any(Number),
            message: expect.any(String),
          }),
        ])
      );
    }
  });
});
