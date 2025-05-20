const { getTaxStatus } = require("../../../src/controllers/taxController");
const admin = require("../../../configs/firebaseConfig");

describe("Get Tax Status Function Tests", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  
  test("Successfully retrieve tax payment status", async () => {
    const req = { params: { referenceId: "TAX2025-629" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    admin.database().ref = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        exists: () => true,
        val: () => ({ referenceId: "TAX2025-629", status: "Paid", amount: 500000 }),
      }),
    }));

    await getTaxStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      referenceId: "TAX2025-629",
      status: "Paid",
      amount: 500000,
    });
  });

  test("Error if reference ID does not exist", async () => {
    const req = { params: { referenceId: "TAX2025-999" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    admin.database().ref = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        exists: () => false,
      }),
    }));

    await getTaxStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Tax payment request not found" });
  });

  test("Error if Firebase database fails", async () => {
    const req = { params: { referenceId: "TAX2025-629" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    admin.database().ref = jest.fn(() => ({
      get: jest.fn().mockRejectedValue(new Error("Database error")),
    }));

    await getTaxStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "An error occurred while retrieving tax payment status: Database error",
    });
  });
});