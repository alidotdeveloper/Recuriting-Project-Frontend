const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const showuser = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    return user;
  } catch (error) {
    console.log("there is an error");
    return res.json({
      error: error,
    });
  }
};

module.exports = showuser;
