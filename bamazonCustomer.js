const inquirer = require("inquirer");
const mysql = require("mysql");

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
[ ] Ask user how many units they want to buy
[ ] Confirm purchase
*/
function shop() {
    inquirer
        .prompt({
            name: "item_id",
            type: "number",
            message: "Input the item number you wish to purchase.",
        })
        .then(function (response) {
            let query = "SELECT item_id, product_name, price FROM products WHERE ?";
            connection.query(query, { item_id: response.item_id }, function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        console.log( "The following information is for the selected item. \n id: " + res[i].item_id + " product: " + res[i].product_name + " price: $" + res[i].price + "number in stock: " + parseInt(res[i].stock_quantity));
                    }
                    purchase();
            });
        });
}

//question shows up before the table and the input is after the table, assuming this is because the function for the question starts running before the table has been populated. Need to fix that

/*
[ ] Check database to see if the item is available
[ ] Check database to see if the quantity of item is available
If Yes
    [ ] Update database to reflect the sold product
    [ ] Display customer's total
    [ ] product_sales -> for every purchase of the item add the price to this value (#product sold * product price)
If No
    [ ] 'Insufficient quantity' if there are not enough of the item
    [ ] Ends transaction
*/

function purchase() {
    inquirer.prompt({
        name: "amount",
        type: "number",
        message: "How many would you like to purchase?"
    }).then(function(response){
        let request = response.amount;
        let query = "SELECT stock_quantity FROM products";
        connection.query(query, function(err, res){
            if (err) throw err;
            // console.log("Number in stock: " + res.stock_quantity);
            console.log("in stock: " + parseInt(res.stock_quantity));
            console.log("You want: " + request);
        })
    })
}
