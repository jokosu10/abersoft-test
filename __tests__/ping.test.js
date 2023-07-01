const request = require("supertest");
const app = require("../servers/Index");

describe("Test ping", () => {
  test("should return 200", async () => {
    const response = await request(app)
      .get("/ping")
      .set("Accept", "application/json")
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: expect.any(String),
      time: expect.any(String)
    });
  });
});
