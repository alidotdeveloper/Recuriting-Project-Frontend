const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyparser = require("body-parser");
const app = express();
const login = require("./routes/login-route");
const signup = require("./routes/signup-route");
const forgetPassword = require("./routes/forget-route");
app.use(express.json());

app.use(cors());

app.use(bodyparser.json());

//middleware
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/forgetpassword", forgetPassword);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
