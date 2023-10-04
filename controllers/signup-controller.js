const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");
const signup = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    console.log(email, password, username);
    const hash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hash,
        role: role,
        username: username,
      },
    });
    if (!email | !password | !username) {
      return res.json({ message: "all field required" });
    } else {
      return res.json({
        message: `Congrats! ${user.username} your account has been created`,
      });
    }
  } catch (error) {
    console.log("there is an issue with prisma");
    return res.json({
      error: error,
    });
  }
};

module.exports = signup;
