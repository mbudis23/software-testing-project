const admin = require("../../configs/firebaseConfig");
const TaxPayment = require("../models/TaxPayment");

const generateReferenceId = () => `TAX${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;

const isValidNpwp = (npwp) => /^[0-9]{16}$/.test(npwp);

const submitTaxPayment = async (req, res) => {
  const { tax_type, amount, npwp } = req.body;

  if (!tax_type || !amount || !npwp) {
    return res.status(400).json({ error: "NPWP, tax type, and amount are required" });
  }

  if (!isValidNpwp(npwp)) {
    return res.status(400).json({ error: "Invalid NPWP format. NPWP must be 16 digits." });
  }

  const userExists = await admin.database().ref(`users/${npwp}`).once('value');
  if (!userExists.exists()) {
    return res.status(404).json({ error: "Invalid NPWP" });
  }

  if (amount < 0) {
    return res.status(400).json({ error: "Amount must be positive" });
  }

  try {
    const referenceId = generateReferenceId();
    const newPayment = new TaxPayment(referenceId, tax_type, amount, npwp, "Paid");

    await admin.database().ref(`tax_payments/${referenceId}`).set(newPayment);

    res.status(201).json({ message: "Tax payment submitted successfully", ...newPayment });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during tax payment submission: " + error.message });
  }
};

const getTaxStatus = async (req, res) => {
  const { referenceId } = req.params;

  try {
    const paymentRef = admin.database().ref(`tax_payments/${referenceId}`);
    const paymentSnapshot = await paymentRef.get();

    if (!paymentSnapshot.exists()) {
      return res.status(404).json({ error: "Tax payment request not found" });
    }

    res.status(200).json(paymentSnapshot.val());
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving tax payment status: " + error.message });
  }
};

module.exports = { submitTaxPayment, getTaxStatus };