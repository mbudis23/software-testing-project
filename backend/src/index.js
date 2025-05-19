const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("../src/routes/userRoutes");
const authRoutes = require("../src/routes/authRoutes");

app.use("/user", userRoutes);
app.use("/account", authRoutes);

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});