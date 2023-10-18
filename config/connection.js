const { connect, connection } = require("mongoose");

connect("mongodb://localhost/postNotionDB");

module.exports = connection;
