const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    console.log(user);
    return res.json({
      message: "account has been created",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

module.exports = signup;
