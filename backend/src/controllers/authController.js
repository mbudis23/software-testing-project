const admin = require("../../configs/firebaseConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await admin.auth().createUser({ email, password });

    const newAccount = new Account(email, hashedPassword, npwp);
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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userCredential = await admin.auth().getUserByEmail(email);

    const userRef = admin.database().ref(`accounts/${userCredential.uid}`);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.val();
    
    if (!userData || !userData.hashedPassword) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const token = jwt.sign(
      { userId: userCredential.uid, email: userCredential.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful", email: userCredential.email, userId: userCredential.uid });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login: " + error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during logout: " + error.message });
  }
};

module.exports = { signup, login, logout };