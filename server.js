const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyparser = require("body-parser");
const app = express();
const login = require("./routes/login-route");

app.use(express.json());
app.use(cors());

app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

//middleware
app.use("/api/login", login);
app.use("/api/signup", login);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
