const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("../src/routes/userRoutes");
const taxRoutes = require("../src/routes/taxRoutes");

app.use("/user", userRoutes);
app.use("/tax", taxRoutes);

// Run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});