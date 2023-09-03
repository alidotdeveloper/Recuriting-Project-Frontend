const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyparser = require("body-parser");
const app = express();
const login = require("./routes/login-route");
const signup = require("./routes/signup-route");
const forgetPassword = require("./routes/forget-route");
const newpassowrd = require("./routes/new-password");
app.use(express.json());

app.use(cors());

app.use(bodyparser.json());

//middleware
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/forgetpassword", forgetPassword);
app.use("/api/forgetpassword/:userId/:token", newpassowrd);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
