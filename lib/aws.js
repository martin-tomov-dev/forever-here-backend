const AWS = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");

AWS.config.update({
  // credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // },
  // region: process.env.AWS_S3_REGION,
});

exports.s3 = new AWS.S3();
