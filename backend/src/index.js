const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("../src/routes/userRoutes");

app.use("/user", userRoutes);

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});