const admin = require("../../configs/firebaseConfig");
const jwt = require("jsonwebtoken");
const TaxPayment = require("../models/TaxPayment");
const { use } = require("../routes/authRoutes");

const generateReferenceId = () => `TAX${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;

const submitTaxPayment = async (req, res) => {
  const { tax_type, amount } = req.body;
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }

  if (!tax_type || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid tax type or amount" });
}


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const userRef = admin.database().ref(`accounts/${userId}`);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.val();
    
    if (!userData || !userData.npwp) {
      return res.status(404).json({ error: "NPWP not found for the logged-in user" });
    }

    const npwp = userData.npwp;

    if (!tax_type || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid tax type or amount" });
    }

    const referenceId = generateReferenceId();
    const newPayment = new TaxPayment(referenceId, tax_type, amount, npwp, "Paid");

    await admin.database().ref(`tax_payments/${referenceId}`).set(newPayment);

    res.status(201).json({ message: "Tax payment submitted successfully", ...newPayment });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during tax payment submission: " + error.message });
  }
};


module.exports = { submitTaxPayment };