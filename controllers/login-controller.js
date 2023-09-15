const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await argon2.hash(password);

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(200).json({ error: "invalid user" });
    }

    if (user.password != password) {
      return res.status(200).json({ error: "password not match" });
    }
    if (!password) {
      return res.status(200).json({ error: "password should not be empty" });
    }

    if (await argon2.verify(hash, password)) {
      res
        .status(200)
        .json({ status: "ok", message: "Login successful", role: user.role });
    } else {
      res.status(200).json({ status: "no", message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = login;
