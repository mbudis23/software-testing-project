const jwt = require("jsonwebtoken");
const { submitTaxPayment } = require("../../src/controllers/taxController");
const admin = require("../../configs/firebaseConfig");

describe("Submit Tax Payment Function Tests", () => {
  test("Should successfully submit tax payment with valid data", async () => {
    
    const mockToken = jwt.sign({ userId: "5fFEy6hqvxN2dpvXp49dw8ErjAN2" }, process.env.JWT_SECRET || "test_secret", { expiresIn: "1h" });

    const req = {
      body: { tax_type: "Income Tax", amount: 500000 },
      cookies: { authToken: mockToken },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    admin.database().ref = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        exists: () => true,
        val: () => ({ npwp: "123456" }),
      }),
      set: jest.fn().mockResolvedValue(),
    }));

    await submitTaxPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: "Tax payment submitted successfully",
      tax_type: "Income Tax",
      amount: 500000,
      status: "Paid",
      npwp: "123456",
    }));
  });

  test("Error if tax type or amount is missing", async () => {
    const req = { body: {}, cookies: { authToken: "valid_token" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await submitTaxPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid tax type or amount" });
  });

  test("Error if user is not logged in", async () => {
    const req = { body: { tax_type: "Income Tax", amount: 500000 }, cookies: {} };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await submitTaxPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized: Please log in first" });
  });

  test("Error if Firebase database fails", async () => {
    const mockToken = jwt.sign({ userId: "user123" }, process.env.JWT_SECRET || "test_secret", { expiresIn: "1h" });

    const req = {
      body: { tax_type: "Income Tax", amount: 500000 },
      cookies: { authToken: mockToken },
    };

    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    admin.database().ref = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        exists: () => true,
        val: () => ({ npwp: "123456" }),
      }),
      set: jest.fn().mockRejectedValue(new Error("Database error")),
    }));

    await submitTaxPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "An error occurred during tax payment submission: Database error",
    });
  });
});