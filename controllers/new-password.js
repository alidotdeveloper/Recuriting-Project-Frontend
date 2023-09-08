const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const newpassword = async (req, res) => {
  const { userId, token, newpassword } = req.body;
  try {
    // checking userId and token is matched with  user provided id and token

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        token: token,
      },
      select: {
        email: true,
      },
    });

    console.log("im in try");
    if (user) {
      console.log("i'm in user");
      return res.status(404).json({ message: "it's valid url" });
    } else {
      console.log("error in your url");
    }

    // verify the token
    //jwt.verify(token, user.token, (err) => {

    //   if (err) {
    //     console.error("JWT Error:", err);
    //     return res.status(404).json({ message: "token invalid" });
    //   } else {
    //     console.log("Token verified");

    //     // Here, you can perform the password update and other operations
    //     // ...

    //     return res.status(200).json({ message: "token verified" });
    //   }
    // });
    //     //if user is found with the valid db

    //     const db_update = prisma.user.update({
    //       select: {
    //         id: userId,
    //       },
    //       data: {
    //         password: newpassword,
    //         token: null,
    //       },
    //     });

    //     // adding validation

    //     if (db_update) {
    //       return res.status(200).json({ message: "password reset successfully" });
    //}
  } catch {
    console.log((err) => "error reseting password" + err);
    res.status(500).json({ message: "internal error" });
  }
};

module.exports = newpassword;
