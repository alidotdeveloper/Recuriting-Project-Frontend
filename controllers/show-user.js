const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//show user api
const showuser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({});
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "got error in catch" });
  }
};

// update user
const updateduser = async (req, res) => {
  const { email, password, role, username } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      data: {
        email: email,
        password: password,
        role: role,
        username: username,
      },
      select: {
        id: true,
      },
    });
    if (updatedUser) {
      return res.status(200).json({ message: "user updated successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Internal error while updating user" });
    }
  } catch (err) {
    console.error("Error reseting password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { showuser, updateduser };
