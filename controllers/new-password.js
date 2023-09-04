const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const newpassword = async (req, res) => {
  const { userId, token, newpassword } = req.body;
  try {
    // checking userId and token is matched with  user provided id and token
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        token: token,
      },
    });
    if (!user) {
      return res.status(200).json({ message: "token is not valid" });
    }

    // if user is found with the valid db
    const db_update = await prisma.user.update({
      select: {
        id: userId,
      },
      data: {
        passowrd: newpassword,
        token: null,
      },
    });

    // adding validation

    if (db_update) {
      return res.status(200).json({ message: "password reset successfully" });
    }
  } catch {
    console.log((err) => "error reseting password" + err);
    res.status(500).json({ message: "internal error" });
  }
};

module.exports = newpassword;
