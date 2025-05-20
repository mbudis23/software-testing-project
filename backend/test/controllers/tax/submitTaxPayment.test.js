const { submitTaxPayment } = require('../../../src/controllers/taxController');
const TaxPayment = require('../../../src/models/TaxPayment');
const admin = require('../../../configs/firebaseConfig');

describe('submitTaxPayment', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  test("Create a new TaxPayment instance with valid properties", () => {
    const referenceId = "TAX2025-001";
    const tax_type = "Pajak Penghasilan";
    const amount = 1000;
    const npwp = "1234567890123456";

    const payment = new TaxPayment(referenceId, tax_type, amount, npwp);

    expect(payment.referenceId).toBe(referenceId);
    expect(payment.tax_type).toBe(tax_type);
    expect(payment.amount).toBe(amount);
    expect(payment.npwp).toBe(npwp);
    expect(payment.status).toBe("Pending"); // Mengecek default status
    expect(payment.submission_date).toBeDefined(); // Pastikan tanggal terbuat
  });

  test("Allow custom status value", () => {
    const payment = new TaxPayment("TAX2025-002", "Pajak Pertambahan Nilai", 2000, "6543210987654321", "Paid");

    expect(payment.status).toBe("Paid");
  });

  test("Correctly format submission_date", () => {
    const payment = new TaxPayment("TAX2025-003", "Pajak Penghasilan", 1500, "9876543210987654");

    expect(new Date(payment.submission_date).toISOString()).toBe(payment.submission_date);
  });

  test('Error if tax_type is missing', async () => {
    req.body = { tax_type: '', amount: 1000, npwp: '1234567890123456' };
    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'NPWP, tax type, and amount are required' });
  });

  test('Error if amount is missing', async () => {
    req.body = { tax_type: 'Pajak Penghasilan', amount: null, npwp: '1234567890123456' };
    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'NPWP, tax type, and amount are required' });
  });

  test('Error if NPWP is missing', async () => {
    req.body = { tax_type: 'Pajak Penghasilan', amount: 1000, npwp: '' };
    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'NPWP, tax type, and amount are required' });
  });

  test('Error if tax_type, amount, and NPWP is missing', async () => {
    req.body = { tax_type: '', amount: null, npwp: '' };
    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'NPWP, tax type, and amount are required' });
  });

  test('Error if NPWP format is invalid', async () => {
    req.body = { tax_type: 'Pajak Penghasilan', amount: 500, npwp: '123' };
    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid NPWP format. NPWP must be 16 digits.' });
  });

  test('Error if user with NPWP is not found', async () => {
    req.body = { tax_type: 'Pajak Penghasilan', amount: 500, npwp: '1234567890123459' };
    jest.spyOn(admin.database().ref(`users/${req.body.npwp}`), 'once').mockResolvedValue({ exists: () => false });

    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid NPWP' });
  });

  test('Error if amount is negative', async () => {
    req.body = { tax_type: 'Pajak Penghasilan', amount: -100, npwp: '1234567890123456' };
    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Amount must be positive' });
  });

  test('Error if amount is zero', async () => {
    req.body = { tax_type: 'Pajak Penghasilan', amount: 0, npwp: '1234567890123456' };
    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'NPWP, tax type, and amount are required' });
  });

  test('Tax payment successfully', async () => {
    req.body = { tax_type: 'Pajak Penghasilan', amount: 1000, npwp: '1234567890123456' };
    jest.spyOn(admin.database().ref(`users/${req.body.npwp}`), 'once').mockResolvedValue({ exists: () => true });
    jest.spyOn(admin.database().ref(`tax_payments/TAX2025-001`), 'set').mockResolvedValue();

    await submitTaxPayment(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Tax payment submitted successfully' }));
  });
});