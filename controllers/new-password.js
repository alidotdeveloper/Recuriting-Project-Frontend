const { PrismaClient } = require("@prisma/client");
const forgetPassword = require("./forget-password-controller");
const prisma = new PrismaClient();

const newpassword = async (req, res) => {
  const { userId, token, newpassword, confirmpassword } = req.body;
  try {
    const user = await prisma.user.updateMany({
      where: {
        password: "",
      },
      select: {
        id: true,
      },
    });
    if (token & userId) {
    }
  } catch {}
};

module.exports = forgetPassword;
