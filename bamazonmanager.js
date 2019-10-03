require("dotenv").config();
var inquirer = require("inquirer");
var connectionInfo = require("./connection_info");
var mysql = require("mysql");
var connection = mysql.createConnection(connectionInfo.connection);
var itemIDs = [];






// --------------- CONNECTS TO THE BAMAZON DATABASE & INITIALIZES APP -------------
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Bamazon (Database ID: " + connection.threadId + ")\n");
    customerAction();
    idValidation();
});


// ------------------ Prompts User For What They Want To Do ---------------------

function customerAction() {
    inquirer.prompt(
        {
            type: "list",
            name: "command",
            message: "Hello Manager. What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]

        }
    ).then(function (answer) {


        // ---------------- Checks Checks for Manager Response -------------------
        if (answer.command === "View Products for Sale") {
            showProductTable()
        }
        else if (answer.command === "View Low Inventory") {
            showLowInventory()
        }
        else if (answer.command === "Add to Inventory") {
            addToInventory()
        }
        else if (answer.command === "Add New Product") {
            addNewProduct()
        }
        else if (answer.command === "Quit") {
            connection.end();
        }

    })

}





// -------------------- FUNCTION TO SHOW PRODUCT TABLE -------------------
function showProductTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("<------------------ ITEMS FOR SALE ------------------------>")
        console.table(res);
        customerAction();
    });


};


// --------------- Function Needed to Validate Item Selection-------------------
// ---- If Manager selects Add Inventory, they need to add to a valid item -----
function idValidation() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            itemIDs.push(res[i].item_id);
        }
    });
}


//-------------------------- Function to Show Low Iventory ITems ------------------
function showLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 20", function (err, res) {
        if (err) throw err;

        var lowItems = res

        if (lowItems.length <= 0) {
            console.log("\n----------------------\nAll Items are Stocked!\n----------------------\n")
            customerAction();
        } else {
            console.table(lowItems)
            customerAction();
        }
    });
}



// --------------- Function to Add Invtentory --------------------------
function addToInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("<------------------ ITEMS FOR SALE ------------------------>")
        console.table(res);

        inquirer.prompt([
            {
                type: "number",
                name: "item_selected",
                message: "Which Item Would You Like To Update Inventory For? [Enter Item ID, Example: 2 for 'Roku 4']",
                validate: function (value) {
                    if (itemIDs.includes(value)) {
                        return true;
                    }
                    else {
                        console.log("\n ------Please Select A Valid Item------")
                        return addToInventory();
                    }

                }
            },
            {
                type: "number",
                name: "addInventory",
                message: "How Many Units Would You Like To Add? [Ex: 30]"
            }

        ]).then(function (answer) {

            var addInventory = answer.addInventory;


            connection.query("SELECT * FROM products WHERE item_id=" + answer.item_selected, function (err, res) {
                if (err) throw err;

                var newInventory = res[0].stock_quantity + addInventory

                connection.query("UPDATE products SET stock_quantity =" + newInventory + " WHERE item_id=" + answer.item_selected, function (err, res) {
                    if (err) throw err;
                    console.log("\n--------------------\nInventory Updated!\n----------------------\n")
                    showProductTable();
                    
                })


            });
        });

    });
}


// --------------- Function to Add Invtentory --------------------------
function addNewProduct() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What Product Would You Like To Add?"

        },
        {
            type: "input",
            name: "department",
            message: "What Department Does It Belong In?"
        },
        {
            type: "number",
            name: "price",
            message: "What is the price? [Ex: 10.50]"
        },
        {
            type: "number",
            name: "quantity",
            message: "How Many In the Inventory? [Ex: 100]"

        }

    ]).then(function (answer) {

        var name = answer.name;
        var price = answer.price;
        var department = answer.department;
        var quantity = answer.quantity;


        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('"+name+"','"+department+"','"+price+"','"+quantity+"')", function (err, res) {
            if (err) throw err;

            console.log("\n--------------------\nNEW Product Added!\n----------------------\n")
            showProductTable();
            
        })


    });
};


