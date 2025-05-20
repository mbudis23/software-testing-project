const admin = require("../configs/firebaseConfig");

beforeAll(async () => {
  await admin.database().goOnline();
});

afterAll(async () => {
  await admin.database().goOffline();
});

jest.mock("../../../configs/firebaseConfig", () => ({
  database: jest.fn(() => ({
    ref: jest.fn(() => ({
      once: jest.fn(),
      set: jest.fn().mockRejectedValue(new Error("Database write failed")),
      get: jest.fn(),
    })),
  })),
}));