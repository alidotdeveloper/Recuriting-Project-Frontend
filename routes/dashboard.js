const express = require("express");
const router = express.Router();

const dashboard = require("../controllers/show-user");

router.get("/", dashboard.showuser);
router.get("/:userId", dashboard.updateduser);

module.exports = router;
