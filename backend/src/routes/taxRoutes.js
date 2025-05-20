const express = require("express");
const { submitTaxPayment, getTaxStatus  } = require("../controllers/taxController");

const router = express.Router();

router.post("/submit", submitTaxPayment);
router.get("/status/:referenceId", getTaxStatus);

module.exports = router;