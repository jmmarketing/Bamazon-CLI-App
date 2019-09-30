require("dotenv").config();
var inquirer = require("inquirer");
var connectionInfo = require("./connection_info");
var mysql = require("mysql");
var connection = mysql.createConnection(connectionInfo.connection);


// --------------- CONNECTS TO THE BAMAZON DATABASE & INITIALIZES APP -------------
connection.connect(function (err) {
   if (err) throw err;
    console.log("Connected to Bamazon (Database ID: " + connection.threadId + ")\n");
    showProductTable();
    
});

// -------------------- FUNCTION TO SHOW PRODUCT TABLE -------------------
function showProductTable(){
   connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        console.log ( "<------------------ ITEMS FOR SALE ------------------------>")
        console.table(res); 

        customerAction();
    });
};


function customerAction (){
    inquirer.prompt([
        {
            type: "number",
            name: "item_selected",
            message: "Which Item Would You Like To Purchase? [Enter Item ID, Example: 2]"
        },
        {
            type: "number",
            name: "item_quantity",
            message: "How Many Would You Like To Buy?"
        },

    ])
}