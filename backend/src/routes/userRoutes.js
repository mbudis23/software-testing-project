const express = require("express");
const { getUserByNpwp } = require("../controllers/userController");

const router = express.Router();

router.get("/:npwp", getUserByNpwp);

module.exports = router;