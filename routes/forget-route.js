const express = require("express");
const router = express.Router();

const forgetPassword = require("../controllers/forget-password-controller");

router.post("/", forgetPassword);

module.exports = router;
