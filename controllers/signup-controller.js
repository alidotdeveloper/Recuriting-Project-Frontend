const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log(email, password, username);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        role: "Admin",
        username: username,
      },
    });

    console.log("user account created", user);
    return res.json({
      message: `Congrats! ${user.username} your account has been created`,
    });
  } catch (error) {
    console.log("there is an issue with prisma");
    return res.json({
      error: error,
    });
  }
};

module.exports = signup;
