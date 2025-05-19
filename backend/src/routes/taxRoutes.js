const express = require("express");
const { submitTaxPayment, getTaxStatus  } = require("../controllers/taxController");
const authenticateUser = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/submit", authenticateUser, submitTaxPayment);
router.get("/status/:referenceId", getTaxStatus);

module.exports = router;