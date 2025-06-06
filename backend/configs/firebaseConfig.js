var admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// var serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.FIREBASE_DATABASE_URL
// });

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.CLIENT_EMAIL.replace(
      '@',
      '%40'
    )}`
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});


module.exports = admin;