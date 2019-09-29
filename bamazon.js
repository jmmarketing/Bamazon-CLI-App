require("dotenv").config();
var inquirer = require("inquirer");
var connectionInfo = require("./connection_info");
var mysql = require("mysql");
var connection = mysql.createConnection(connectionInfo.connection);

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Bamazon (Database ID: " + connection.threadId + ").\n");
});
