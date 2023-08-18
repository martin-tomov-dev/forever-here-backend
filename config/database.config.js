const mysql = require("mysql2");
require("dotenv").config();
const connectionLog = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
});
console.log(
  process.env.DB_DATABASE,
  process.env.DB_PASSWORD,
  process.env.DB_USERNAME
);

module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
