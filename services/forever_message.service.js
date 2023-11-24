const ForeverMessages = require("../models/foreverMessages.model");

exports.createMessage = (data) => {
  console.log("service", data);
  return ForeverMessages.create(data);
};

exports.getMessageById = (id) => {
  console.log("==========>id", id);
  return ForeverMessages.findAll({ where: { id: id } });
};
