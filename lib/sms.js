// const SNS = require("@aws-sdk/client-sns");

const AWS = require("aws-sdk");
// const SNS = new AWS.SNS();

exports.sendSMS = async (phoneNumber, message) => {
  const SMSparams = {
    Message: message,
    PhoneNumber: phoneNumber,
  };
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    region: process.env.AWS_S3_REGION, // Replace with your desired AWS region
  });
  console.log(
    "aws region ==========>",
    process.env.AWS_ACCESSKEYID,
    process.env.AWS_SECRETACCESSKEY,
    process.env.AWS_S3_REGION
  );
  // const publishTextPromise = new SNS.SNS({
  //   apiVersion: "2010-03-31",
  //   region: process.env.AWS_S3_REGION,
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESSKEYID,
  //     secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  //   },
  // }).publish(SMSparams);
  // await publishTextPromise
  //   .then((data) => {
  //     console.log("MessageID is " + data.MessageId);
  //   })
  //   .catch((err) => {
  //     console.error(err, err.stack);
  //   });
  const sns = new AWS.SNS();
  const params = {
    Message: "Hello from AWS SNS!", // The message you want to send
    PhoneNumber: "+17812620535", // The recipient's phone number
  };

  sns.publish(params, (err, data) => {
    if (err) {
      console.log("Error sending SMS:", err);
    } else {
      console.log("SMS sent successfully. Message ID:", data.MessageId);

      getMessageStatus(data.MessageId);
    }
  });
};

const getMessageStatus = async (messageId) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    region: process.env.AWS_S3_REGION, // Replace with your desired AWS region
  });

  var sns1 = new AWS.SNS({ apiVersion: "2010-03-31" });
  const params = {
    MessageId: messageId,
  };

  try {
    const response = await sns1.getSMSAttributes(params).promise();
    const messageStatus = response.Attributes["AWS.SNS.SMS.SMSType"];
    console.log("Message Status:", messageStatus);
  } catch (error) {
    console.error("Error retrieving message status:", error);
  }
};
