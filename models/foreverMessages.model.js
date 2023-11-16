const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const ForeverMessages = sequelize.define(
  "ForeverMessages",
  {
    attachment: {
      type: DataTypes.STRING,
    },
    receiver: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    Message: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
module.exports = ForeverMessages;
