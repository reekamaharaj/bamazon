const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

let toBePurchased;
let total;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yuffie",
    database: "bamazonDB",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

//table constructor
const table = new Table({
    head: ["Id", "Product", "Price"],
    colWidths: [5, 20, 10],
});

//function to print table
/*
run
[x] display all items available for sale 
    [x] displays item ids
    [x] displays item name
    [x] displays item price
*/
function start() {
    connection.query("SELECT * from products", function (err, res) {
        if (err) throw err;
        console.log("The available items are:");
        res.forEach((res) => {
            table.push([
                `${res.item_id}`,
                `${res.product_name}`,
                `${res.price}`,
            ]);
        });
        console.log(table.toString());
        shop();
    });
}

/*
prompt user with messages
[x] Ask user for the id of the product they want
[x] Ask user how many units they want to buy
[x] Process purchase
*/
function shop() {
    inquirer
        .prompt({
            name: "item_id",
            type: "number",
            message: "Input the item number you wish to purchase.",
        })
        .then(function (response) {
            let query =
                "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: response.item_id }, function (
                err,
                res
            ) {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    toBePurchased = res[i];
                    console.log(
                        "The following item has been selected for purchase: \n" +
                            res[i].product_name +
                            " for $" +
                            res[i].price
                    );
                }
                purchase(toBePurchased);
            });
        });
}

//question shows up before the table and the input is after the table, assuming this is because the function for the question starts running before the table has been populated. Need to fix that

/*
[x] Check database to see if the item is available
[x] Check database to see if the quantity of item is available
If Yes
    [x] Update database to reflect the sold product
    [x] Display customer's total
    [ ] product_sales -> for every purchase of the item add the price to this value (#product sold * product price)
If No
    [x] 'Insufficient quantity' if there are not enough of the item
    [x] Ends transaction
*/

function purchase(item) {
    inquirer
        .prompt({
            name: "amount",
            type: "number",
            message: "How many would you like to purchase?",
        })
        .then(function (response) {
            let request = response.amount;
            let query = "SELECT stock_quantity, product_sales FROM products";
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("You want: " + request);
                if (request <= item.stock_quantity) {
                    let newQuantity = item.stock_quantity - request;
                    total = request * item.price;
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity,
                                product_sales: total
                            },
                            {
                                item_id: item.item_id,
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log("Your total is: $" + total);
                        }
                    );
                    connection.end();
                } else {
                    console.log("Sorry we only have " + item.stock_quantity);
                    connection.end();
                }
            });
        });
}
