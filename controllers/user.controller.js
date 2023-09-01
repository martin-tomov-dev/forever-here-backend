const AuthService = require("../services/auth.service");
const jwtConfig = require("../config/jwt.config");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.util");
const sms = require("../lib/sms");
let cron = require("node-cron");
const { listenerCount } = require("keyv");

exports.sendMessage = async (req, res, next) => {
  const StatusCodes = require("http-status-codes");

  const { email, phone_number, message, subject, date, name } = req.body;
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
      subject: `${subject}`,
      html: `<h2>Hi ${name}!</h2> \n <p>${message}</p>`,
    });

    try {
      await sms.sendSMS(
        phone_number,
        `${subject} \n Hi ${name}! \n ${message}`
      );
    } catch (error) {
      console.log("sms error------>", error);
      return next({
        status: StatusCodes.default.INTERNAL_SERVER_ERROR,
        message: "There were some problem to send SMS",
      });
    }
    let i = 0;
    // const cron_name
    cron.schedule("*/10 * * * *", async () => {
      i++;
      console.log(i);
      await transporter.sendMail({
        from: "devsonspree@gmail.com",
        to: email,
        subject: "Forever Message",
        html: `${message}`,
      });
    });

    res.status(StatusCodes.default.OK).json("Please check the email box");
  } catch (error) {
    console.log("could not send");
    return next({
      status: StatusCodes.default.BAD_REQUEST,
      message: `Could not send the request`,
    });
  }
};
