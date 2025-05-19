const express = require("express");
const { submitTaxPayment } = require("../controllers/taxController");
const authenticateUser = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/submit", authenticateUser, submitTaxPayment);

module.exports = router;