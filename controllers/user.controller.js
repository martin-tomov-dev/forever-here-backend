const AuthService = require("../services/auth.service");
const jwtConfig = require("../config/jwt.config");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.util");
const sendSMS = require("../lib/sms");

exports.sendMessage = async (req, res, next) => {
  const StatusCodes = require("http-status-codes");
  // console.log("status", StatusCodes);

  console.log("111");
  const { email, phone_number } = req.body;
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

    try {
      await sendSMS(phone_number, `This is SMS message!`);
    } catch (error) {
      return next({
        status: StatusCodes.default.INTERNAL_SERVER_ERROR,
        message: "There were some problem to send SMS",
      });
    }

    res.status(StatusCodes.default.OK).json("Please check the email box");
  } catch (error) {
    console.log("could not send");
    return next({
      status: StatusCodes.default.BAD_REQUEST,
      message: `Could not send the request`,
    });
  }
};
