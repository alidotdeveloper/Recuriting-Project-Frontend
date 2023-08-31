const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
require("dotenv").config();

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

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
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        var mailOptions = {
          from: "alihassnain330@gmail.com",
          to: "krystina53@ethereal.email",
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
