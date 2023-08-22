import { SNS } from "@aws-sdk/client-sns";

export const sendSMS = async (phoneNumber, message) => {
  const SMSparams = {
    Message: message,
    PhoneNumber: phoneNumber,
  };
  const publishTextPromise = new SNS({
    apiVersion: "2010-03-31",
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESSKEYID,
      secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    },
  }).publish(SMSparams);
  await publishTextPromise
    .then((data) => {
      console.log("MessageID is " + data.MessageId);
    })
    .catch((err) => {
      console.error(err, err.stack);
    });
};
