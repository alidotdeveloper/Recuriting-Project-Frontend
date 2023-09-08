const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
require("dotenv").config();

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // db from prisma
    const juser = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email: email,
      },
    });

    // creating jwt token here

    jwt.sign(
      { user: juser.id },
      "secretkey",
      { expiresIn: "60min" },
      async (err, jtoken) => {
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
        console.log("your token is: " + jtoken);

        const storedToken = `http://localhost:3000/new-password/${juser.id}/${jtoken}`;

        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            token: jtoken,
            createdAt: new Date(),
          },
          select: {
            id: true,
            token: true,
          },
        });
        //console.log("Reset token saved:" + user);

        // if (!user) {
        //   return res.status(200).json({ message: "Invalid Credentials" });
        // }

        var mailOptions = {
          from: "alidotdeveloper@gmail.com",
          to: "alihassnain330@gmail.com",
          subject: "Here is your link to reset password",
          text: storedToken,
        };

        console.log(storedToken);

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
