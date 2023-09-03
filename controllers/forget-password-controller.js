const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

// Generate a new UUID

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const token = uuidv4();
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        token: token,
        createdAt: new Date(),
      },
      select: {
        id: true,
        token: true,
      },
    });
    console.log("Reset token saved:", user.token);

    if (!user) {
      return res.status(200).json({ message: "Invalid Credentials" });
    }

    jwt.sign(
      { user: user.id },
      "secretkey",
      { expiresIn: "60s" },
      (err, token) => {
        if (err) {
          console.error("JWT Error:", err);
          return res.status(500).json({ error: "JWT error" });
        }

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        var mailOptions = {
          from: "alidotdeveloper@gmail.com",
          to: "alihassnain330@gmail.com",
          subject: "Here is your link to reset password",
          text: `http://localhost:3000/forget-password/${user.id}?token=${token}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        // Send success response outside of the sendMail callback
        res.status(200).json({ message: "Email sent successfully" });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};
module.exports = forgetPassword;
