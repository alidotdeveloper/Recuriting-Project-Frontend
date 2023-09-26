const express = require("express");
const router = express.Router();

const dashboard = require("../controllers/show-user");

router.get("/", dashboard.showuser);
router.put("/:userId/:username/:email/:password/:role", dashboard.updateduser);

module.exports = router;
