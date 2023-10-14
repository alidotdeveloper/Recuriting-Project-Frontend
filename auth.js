const jwt = require("jsonwebtoken");
const login = require("./controllers/login-controller");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtlogin;
    if (token) {
      const verifyuser = jwt.verify(token, "jwtkey");
      console.log(verifyuser);
      next();
    } else {
      console.log("user is not authenticated");
      return res.status(500).json({ message: "user is not authenticated" });
    }
  } catch (err) {
    console.log("there is  some error");
    return res.status(500).json({ message: "got error in catch" });
  }
};

module.exports = auth;
