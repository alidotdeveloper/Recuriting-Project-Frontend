const express = require("express");
const router = express.Router();

const newpassword = require("../controllers/new-password");

router.post("/api/forgetpassword/:userId/:token", newpassword);

module.exports = router;
