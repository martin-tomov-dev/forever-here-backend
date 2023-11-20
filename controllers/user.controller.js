const ForeverMessagesServices = require("../services/forever_message.service");
const jwtConfig = require("../config/jwt.config");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.util");
const sms = require("../lib/sms");
let cron = require("node-cron");
const { listenerCount } = require("keyv");
const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const { prisma } = require("../lib/prisma");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new AWS.S3();

exports.sendMessage = async (req, res, next) => {
  const StatusCodes = require("http-status-codes");

  const { email, phone_number, message, subject, name, link, date } = req.body;
  console.log(
    "data",
    email,
    phone_number,
    message,
    subject,
    name,
    link,
    date.split("-")
  );
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

    // //send email
    await transporter.sendMail({
      from: "devsonspree@gmail.com",
      to: email,
      subject: `${subject}`,
      html: `<h2>Hi ${name}!</h2> \n <p>${message}</p> <p>Here is the attachment link ${link}</p>`,
    });

    try {
      await sms.sendSMS(
        phone_number,
        `${subject} \n Hi ${name}! \n ${message}`
      );
    } catch (error) {
      console.log("sms error------>", error);
      // return next({
      //   status: StatusCodes.default.INTERNAL_SERVER_ERROR,
      //   message: "There were some problem to send SMS",
      // });
    }
    let i = 0;

    try {
      await ForeverMessagesServices.createMessage({
        attachment: link,
        receiver: name,
        subject: subject,
        Message: message,
        mobile: phone_number,
        email: email,
        date: date,
      });
    } catch (error) {
      console.log("can't create forever message", error);
    }

    // const cron_name
    cron.schedule(
      `0 0 ${date.split("-")[1]}* ${date.split("-")[2]}*`,
      async () => {
        i++;
        console.log(i);
        await transporter.sendMail({
          from: "devsonspree@gmail.com",
          to: email,
          subject: "Forever Message",
          html: `${message}`,
        });
      }
    );

    cron.start();

    res.status(StatusCodes.default.OK).json("Please check the email box");
  } catch (error) {
    console.log("could not send");
    return next({
      status: StatusCodes.default.BAD_REQUEST,
      message: `Could not send the request`,
    });
  }
};

exports.uploadFile = (req, res, next) => {
  let keyName = req.file.originalname;
  const params = {
    Bucket: process.env.AWS_S3_BUCKETNAME,
    Key: keyName,
    Body: req.file.buffer,
  };

  console.log("uuid", uuid());

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file");
    }

    res.send(
      `https://s3.eu-west-2.amazonaws.com/front.forever-here/${keyName}`
    );
  });
};
