const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const newpassword = async (req, res) => {
  const { userId, token } = req.params;
  const { newPassword } = req.body;

  // Checking if userId and token match a user in the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid or expired token" });
  }

  // Verify the token
  jwt.verify(token, "secretkey", async (err) => {
    if (err) {
      console.error("JWT Error:", err);
      return res.status(403).json({ message: "Token invalid" });
    } else {
      // Token is valid, update the user's password and clear the token
      try {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: newPassword,
            token: null,
          },
        });
        console.log("new password is" + newPassword);

        if (updatedUser) {
          return res
            .status(200)
            .json({ message: "Password reset successfully" });
        } else {
          return res
            .status(500)
            .json({ message: "Internal error while updating password" });
        }
      } catch (err) {
        console.error("Error reseting password:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
};

module.exports = newpassword;
