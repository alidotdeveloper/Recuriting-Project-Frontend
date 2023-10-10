const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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

    const generatedToken = jwt.sign({ user: user.id.toString() }, "secretkey");
    const updateduser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: generatedToken,
      },
    });

    const expirationDate = new Date(Date.now() + 2589200000); // Set the expiration time 30 days in the future
    const cookies = res.cookie("jwt", generatedToken, {
      expires: expirationDate,
      httpOnly: true,
    });
    console.log(cookies);

    if (updateduser) {
      return res.json({
        message: `Congrats! ${user.username} your account has been created`,
        token: generatedToken,
      });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.log("got error in catch");
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = signup;
