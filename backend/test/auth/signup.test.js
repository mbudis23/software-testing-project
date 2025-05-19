const bcrypt = require("bcrypt");
const { signup } = require("../../src/controllers/authController");
const admin = require("../../configs/firebaseConfig");

describe("Signup Function Tests", () => {
  test("Successfully sign up with valid email and NPWP", async () => {
    const req = { body: { email: "user@example.com", password: "SecurePass123", npwp: "505064" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    const userRef = admin.database().ref(`accounts/${res.json.mock.calls[0][0].userId}`);
    const userSnapshot = await userRef.get();
    const storedData = userSnapshot.val();

    expect(storedData.hashedPassword).not.toBe(req.body.password);
    
    const isPasswordHashed = await bcrypt.compare(req.body.password, storedData.hashedPassword);
    expect(isPasswordHashed).toBe(true);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: "user@example.com", npwp: "505064" }));
  });

  test("Error if NPWP not found", async () => {
    const req = { body: { email: "user@example.com", password: "SecurePass123", npwp: "654321" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "NPWP not found" });
  });

  test("Error if NPWP format is invalid", async () => {
    const req = { body: { email: "user@example.com", password: "SecurePass123", npwp: "abc123xyz" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid NPWP format" });
  });

  test("Error if email already in use", async () => {
    const req = { body: { email: "fulan@example.com", password: "SecurePass123", npwp: "123456" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already in use" });
  });
});