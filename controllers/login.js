const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and passowrd required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
        role: true,
      },
    });

    console.log("user:", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password === password) {
      res.status(200).json({ message: "Login successful", role: user.role });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = login;
