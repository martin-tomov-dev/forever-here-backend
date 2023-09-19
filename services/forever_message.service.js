const ForeverMessages = require("../models/foreverMessages.model");

exports.createMessage = (data) => {
  console.log("service", data);
  return ForeverMessages.create(data);
};
