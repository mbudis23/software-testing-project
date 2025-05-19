const { logout } = require("../../src/controllers/authController");

describe("Logout Function Tests", () => {
  test("Successfully log out and clear authToken cookie", async () => {
    const req = { cookies: { authToken: "valid_token_here" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      clearCookie: jest.fn(),
    };

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Logout successful" });
    expect(res.clearCookie).toHaveBeenCalledWith("authToken", expect.objectContaining({ httpOnly: true }));
  });
});