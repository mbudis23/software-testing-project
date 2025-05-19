var admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

var serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;