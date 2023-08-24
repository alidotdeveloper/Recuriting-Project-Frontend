const express = require("express");
const router = express.Router();

const login = require("../controllers/login-controller");
const signup = require("../controllers/signup-controller");

router.post("/", login);

module.exports = router;
