const AuthService = require("../services/auth.service");
const jwtConfig = require("../config/jwt.config");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.util");
const sms = require("../lib/sms");
const schedule = require("node-schedule");

exports.sendMessage = async (req, res, next) => {
  const nodemailer = require("nodemailer");

  const StatusCodes = require("http-status-codes");

  const { email, phone_number } = req.body;

  // set the mail service
  const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const jobHandler = async () => {
    try {
      // send email
      await transporter.sendMail({
        from: "devsonspree@gmail.com",
        to: email,
        subject: "Forever Message",
        html: "hiii!!!",
      });
    } catch (error) {
      console.log("could not send");
      return next({
        status: StatusCodes.default.BAD_REQUEST,
        message: `Could not send the request`,
      });
    }

    // send sms
    // try {
    //   await sms.sendSMS(phone_number, `This is SMS message!`);
    // } catch (error) {
    //   console.log("sms error------>", error);
    //   return next({
    //     status: StatusCodes.default.INTERNAL_SERVER_ERROR,
    //     message: "There were some problem to send SMS",
    //   });
    // }
  };

  const job = schedule.scheduleJob("*/5 * * * *", jobHandler);
  console.log("job----->", job);
  res.status(StatusCodes.default.OK).json("Please check the email box");
};
