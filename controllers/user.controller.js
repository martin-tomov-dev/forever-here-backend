const AuthService = require("../services/auth.service");
const jwtConfig = require("../config/jwt.config");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.util");

exports.sendMessage = async (req, res) => {
  console.log("111");
  const { email } = req.body;
  try {
    const nodemailer = require("nodemailer");

    // set the mail service
    const transporter = nodemailer.createTransport({
      host: "mail.smtp2go.com",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // send email
    await transporter.sendMail({
      from: "devsonspree@gmail.com",
      to: email,
      subject: "Forever Message",
      html: "hiii!!!",
    });

    const exist_forgotUser = await prisma.forgotPassword.findFirst({
      where: { OR: [{ email }] },
    });
    if (exist_forgotUser) {
      await prisma.forgotPassword.update({
        where: { email: email },
        data: {
          email,
          passcode,
          updated_date,
        },
      });
    } else {
      await prisma.forgotPassword.create({
        data: {
          email,
          passcode,
          updated_date,
        },
      });
    }

    res.status(StatusCodes.OK).json("Please check the email box");
  } catch (error) {
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: `Could not send the request`,
    });
  }
};