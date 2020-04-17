const inquirer = require("inquirer");
const mysql = require("mysql");
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
    table();
});

//function to print table
/*
run
[x] display all items available for sale 
    [x] displays item ids
    [x] displays item name
    [x] displays item price
*/
function table() {
    connection.query("SELECT * from products", function (err, res) {
        if (err) throw err;
        console.log("The available items are:");
        res.forEach((res) => {
            console.log(
                `id: ${res.item_id} product: ${res.product_name} price: $${res.price} number in stock: ${res.stock_quantity}`
            );
        });
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
                        " The following information is for the selected item. \n id: " +
                            res[i].item_id +
                            " product: " +
                            res[i].product_name +
                            " price: $" +
                            res[i].price +
                            " number in stock: " +
                            res[i].stock_quantity
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
            let query = "SELECT stock_quantity FROM products";
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("in stock: " + item.stock_quantity);
                console.log("You want: " + request);
                if (request <= item.stock_quantity){
                    let newQuantity = item.stock_quantity - request;
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: item.item_id
                            }
                        ], function(err, res) {
                            if(err) throw err;
                            total = (request*item.price);
                            console.log("Your total is: $" + total);
                            console.log(res.affectedRows + " stock quantity updated.");
                        }
                    );
                    connection.end();
                }
                else {
                    console.log("Sorry we only have " + item.stock_quantity);
                    connection.end();
                }
            });
        });
}
