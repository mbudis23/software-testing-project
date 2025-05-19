const admin = require("../../configs/firebaseConfig");
const Account = require("../models/Account");

const isValidNpwp = (npwp) => /^[0-9]{6}$/.test(npwp);

const signup = async (req, res) => {
  const { email, password, npwp } = req.body;

  if (!email || !password || !npwp) {
    return res.status(400).json({ error: "Email, password, and NPWP must be filled in" });
  }

  if (!isValidNpwp(npwp)) {
    return res.status(400).json({ error: "Invalid NPWP format" });
  }

  try {
    const userRef = admin.database().ref(`users/${npwp}`);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists()) {
      return res.status(404).json({ error: "NPWP not found" });
    }

    const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const userRecord = await admin.auth().createUser({ email, password });

    const newAccount = new Account(email, npwp);
    await admin.database().ref(`accounts/${userRecord.uid}`).set(newAccount);

    res.status(201).json({
      userId: userRecord.uid,
      email: userRecord.email,
      npwp,
      message: "Signup successful",
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while registering: " + error.message });
  }
};

module.exports = { signup };