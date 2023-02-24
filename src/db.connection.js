const dbConfig = require("./configs/db.config");
const mysql = require("mysql");
const conn = mysql.createConnection(dbConfig);
conn.connect();

module.exports = {
  conn,
};
