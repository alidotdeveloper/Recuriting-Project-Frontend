const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

app.use("/", (req, res) => {
  res.send("hello");
});

async function db() {
  const user = await prisma.user.create({
    data: {
      email: "a@gmail.com",
      password: "aliert",
      role: "Admin",
    },
  });
  console.log("User created:", user);
}
db();

const PORT = 8080;
app.listen(PORT, console.log(`working on : ${PORT}`));
