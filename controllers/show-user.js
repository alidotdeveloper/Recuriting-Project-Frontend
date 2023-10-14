const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//show user api

const showuser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({});

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "got error in catch in display" });
  }
};

// update user
const updateduser = async (req, res) => {
  const { userId } = req.params;
  const { email, password, role, username } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      data: {
        email: email,
        password: password,
        role: role,
        username: username,
      },
      where: {
        id: userId,
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

// delete user
const deleteuser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    if (deleteUser.id === userId) {
      return res.status(200).json({ message: "user deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Internal error while deleting user" });
    }
  } catch (err) {
    console.error("Error deleting:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { showuser, updateduser, deleteuser };
