require("dotenv").config();
var inquirer = require("inquirer");
var connectionInfo = require("./connection_info");
var mysql = require("mysql");
var connection = mysql.createConnection(connectionInfo.connection);
var itemIDs =[];

// --------------- CONNECTS TO THE BAMAZON DATABASE & INITIALIZES APP -------------
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Bamazon (Database ID: " + connection.threadId + ")\n");
    showProductTable();

});

// -------------------- FUNCTION TO SHOW PRODUCT TABLE -------------------
function showProductTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // ------------ Used for Validation in Inquirer ------------
        for (var i = 0; i < res.length; i++){
           itemIDs.push(res[i].item_id);
        }
        // ----------------------------------------------------------

        items = res;
        console.log("<------------------ ITEMS FOR SALE ------------------------>")
        console.table(res);
        customerAction();
    });

    
};


function customerAction() {
    inquirer.prompt([
        {
            type: "number",
            name: "item_selected",
            message: "Which Item Would You Like To Purchase? [Enter Item ID, Example: 2 for 'Roku 4']",
            validate: function (value) {
                if (itemIDs.includes(value)) {
                    return true;
                }
                else {
                    console.log("\n ------Please Select A Valid Item------")
                    return customerAction()
                }

            }
        },
        {
            type: "number",
            name: "item_quantity",
            message: "How Many Would You Like To Buy?"
        }
    ]).then(function (answer) {

    })
}