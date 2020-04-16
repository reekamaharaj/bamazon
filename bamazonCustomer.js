const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yuffie",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    table();
});

//function to print table
/*
run
[ ] display all items available for sale 
    [ ] displays item ids
    [ ] displays item name
    [ ] displays item price
*/
function table(){
    connection.query("SELECT * from products",
    function(err, res){
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

/*
prompt user with messages
[ ] Ask user for the id of the product they want
[ ] Ask user how many units they want to buy
[ ] Confirm purchase
*/
function shop(){

}

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
function checkDb(){

}

function purchase(){

}