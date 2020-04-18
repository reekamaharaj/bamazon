const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yuffie",
    database: "bamazonDB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    menu();
});

// [x] display menu (list)
//     [x] View Products for Sale
//     [x] View Low Inventory
//     [x] Add to Inventory
//     [x] Add New Product

function menu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function(answer){
        switch(answer.action){
            case "View Products for Sale":
                products();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addToInventory();
                break;

            case "Add New Product":
                addProduct();
                break;

            case "exit":
                connection.end();
                break;
        }
    });
}

// View Products for Sale
// [x] display all items available for sale 
//     [x] displays item ids
//     [x] displays item name
//     [x] displays item price
//     [x] displays item quantity

function products(){
    connection.query("SELECT * from products", function (err, res) {
        if (err) throw err;
        console.log("The available items are:");
        res.forEach((res) => {
            console.log(
                `id: ${res.item_id} product: ${res.product_name} price: $${res.price} quantity in stock: ${res.stock_quantity}`
            );
        });
        connection.end();
    });
}

// View Low Inventory
// [ ] display all items with an inventory lower than 5
function lowInventory(){
console.log("low inventory");
connection.end();
}

Add to Inventory
// [ ] prompt user to "add more" of item
function addToInventory(){
console.log("add to inventory");
connection.end();
}

// Add New Product
// [ ] will allow user to add a new product
function addProduct(){
console.log("add product");
connection.end();
}