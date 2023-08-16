const express = require("express");
const router = express.Router();

const login = require("../controllers/login");

// router.get("/", (req, res) => {
//   res.send("hello");
// });

router.post("/", login);
// router.get("/admin", admin);
module.exports = router;
