const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Signout user
const signout = async (req, res) => {
  try {
    res.clearCookie("jwtlogin");
    console.log("cookie clear successfully");
    return res.status(200).json({ message: "cookie clear successfully" });
  } catch (err) {
    console.log("getting error in catch" + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signout;
