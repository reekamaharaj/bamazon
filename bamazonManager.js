const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

let moreProduct;

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

const table = new Table({
    head: ['Id', 'Product', 'Price', 'In Stock'], colWidths: [5, 20, 10, 10]
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
            "Add New Product",
            "exit"
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
            table.push( [`${res.item_id}`, `${res.product_name}`, `$${res.price}`, `${res.stock_quantity}`])
        });
        console.log(table.toString());
        connection.end();
    });
}

// View Low Inventory
// [x] display all items with an inventory lower than 5
function lowInventory(){
    let query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity <= 5";

    const lowInv = new Table ({
        head: ['Id', 'Product', 'In Stock'], colWidths: [5,20,10]
    })
    
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("The following products have an inventory less than 5: ");
        res.forEach((res) => {
            lowInv.push([`${res.item_id}`, `${res.product_name}`, `${res.stock_quantity}`]);
        });
        console.log(lowInv.toString());
        connection.end();
    })
}

// Add to Inventory
// [x] prompt user to "add more" of item
function addToInventory(){
    inquirer.prompt({
        name: "item_id",
        type: "number",
        message: "What is the item number for the product?"
    }).then(function(response){
        let query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: response.item_id}, function(err, res){
            if(err) throw err;
            for (let i =0; i < res.length; i++){
                moreProduct = res[i];
                console.log(
                    "The following item has been selected:\n" +
                        res[i].product_name +
                        "\nIn stock: " + 
                        res[i].stock_quantity
                );
            }
            increaseQuant(moreProduct);
        });
    });
}

function increaseQuant(item){
    inquirer.prompt({
        name: "amount",
        type: "number",
        message: "How much is being added?"
    }).then(function(response){
        let input = response.amount;
        let query = "SELECT stock_quantity FROM products";
        connection.query(query, function(err, res){
            if (err) throw err;
            let newQuantity = item.stock_quantity + input;
            connection.query( "UPDATE products SET ? WHERE ?", 
            [
                {
                    stock_quantity: newQuantity
                },
                {
                    item_id: item.item_id
                }
            ], function (err, res){
                if(err) throw err;
                console.log("Stock quantity updated.");
            });
            connection.end();
        });
    });
}

// Add New Product
// [x] will allow user to add a new product
function addProduct(){
    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "What is the name of the product?"
        },
        {
            name: "department",
            type: "input",
            message: "What department will this product be in?"
        },
        {
            name: "price",
            type: "number",
            message: "How much does this product cost?",
            validate: function(value) {
                if (isNaN(value) === false){
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "number",
            message: "How much product?",
            validate: function(value) {
                if (isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.productName,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.stock
            },
            function(err){
                if(err) throw err;
                console.log("Product added!");
            }
        )
        connection.end();
    })
}