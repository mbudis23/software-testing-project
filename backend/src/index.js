const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const userRoutes = require("../src/routes/userRoutes");
const authRoutes = require("../src/routes/authRoutes");
const taxRoutes = require("../src/routes/taxRoutes");

app.use("/user", userRoutes);
app.use("/account", authRoutes);
app.use("/tax", taxRoutes);

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});