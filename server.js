const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bodyparser = require("body-parser");
const app = express();
const login = require("./routes/login-route");
const signup = require("./routes/signup-route");
const forgetPassword = require("./routes/forget-route");
const newpassword = require("./routes/new-password");
const showuser = require("./routes/dashboard");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//middleware
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/forgetpassword", forgetPassword);
app.use("/", newpassword);
app.use("/api/showuser", showuser);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
