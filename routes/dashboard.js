const express = require("express");
const router = express.Router();

const dashboard = require("../controllers/show-user");

router.post("/", dashboard);

module.exports = router;
