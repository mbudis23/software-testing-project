const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { login } = require("../../src/controllers/authController");
const admin = require("../../configs/firebaseConfig");

describe("Login Function Tests", () => {
  test("Successfully log in with valid email and password", async () => {
    const req = { body: { email: "user@example.com", password: "SecurePass123" } };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn(),
    };

    admin.auth().getUserByEmail = jest.fn().mockResolvedValue({ uid: "user123", email: "user@example.com" });

    const hashedPassword = await bcrypt.hash("SecurePass123", 10);
    admin.database().ref = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        exists: () => true,
        val: () => ({ hashedPassword }),
      }),
    }));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Login successful", email: "user@example.com" }));
    expect(res.cookie).toHaveBeenCalledWith("authToken", expect.any(String), expect.objectContaining({ httpOnly: true }));
  });

  test("Error if email is not registered", async () => {
    const req = { body: { email: "notfound@example.com", password: "SecurePass123" } };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    admin.auth().getUserByEmail = jest.fn().mockRejectedValue(new Error("User not found"));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "An error occurred during login: User not found" });
  });

  test("Error for incorrect password", async () => {
    const req = { body: { email: "user@example.com", password: "WrongPass456" } };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    admin.auth().getUserByEmail = jest.fn().mockResolvedValue({ uid: "user123", email: "user@example.com" });

    const hashedPassword = await bcrypt.hash("SecurePass123", 10);
    admin.database().ref = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        exists: () => true,
        val: () => ({ hashedPassword }),
      }),
    }));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid login credentials" });
  });

  test("Error if email or password is missing", async () => {
    const req = { body: { email: "", password: "" } };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email and password are required" });
  });
});