const { getUserByNpwp } = require("../../src/controllers/userController");

describe("getUserByNpwp Function Tests", () => {
  test("Retrieve user data with valid NPWP", async () => {
    const req = { params: { npwp: "123456" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getUserByNpwp(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ npwp: "123456" }));
  });

  test("Error if NPWP not found", async () => {
    const req = { params: { npwp: "654321" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getUserByNpwp(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "NPWP not found" });
  });

  test("Error if NPWP format is invalid", async () => {
    const req = { params: { npwp: "abc123xyz" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getUserByNpwp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid NPWP format" });
  });
});