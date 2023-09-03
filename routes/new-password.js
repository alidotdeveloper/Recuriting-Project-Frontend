const express = require("express");
const router = express.Router();

const newpassword = require("../controllers/new-password");

router.post("/", newpassword);

module.exports = router;
