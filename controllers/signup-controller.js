const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    console.log(email, password, role);

    if (!email || !password || !username || !role) {
      return res.json({ message: "all field required" });
    }

    const hash = await argon2.hash(password);

    // generating user
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hash,
        role: role,
        username: username,
      },
    });

    const token = jwt.sign(
      { user: user.id.toString() },
      process.env.SECURITY_KEY
    );

    const updateduser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: token,
      },
    });

    if (updateduser) {
      res.cookie("jwtcookie", token);

      res.on("finish", () => {
        console.log("Cookie generated and sent");
      });
      res.status(200).json({
        message: "user created",
      });
    } else {
      console.log("User is not updated");
    }
  } catch (error) {
    console.log("got error in catch");
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = signup;
