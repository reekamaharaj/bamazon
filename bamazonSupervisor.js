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
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    menu();
});


// run
// [x] display menu (list)
//     [x] View Product Sales by Department
//     [x] Create New Department

function menu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Product Sales by Department",
            "Create a New Department",
            "exit"
        ]
    }).then(function(answer){
        switch(answer.action){
            case "View Product Sales by Department":
                productDep();
                break;
            case "Create a New Department":
                newDep();
                break;

            case "exit":
                connection.end();
                break;
        }
    });
}

// View Product Sales by Department
// [ ] display table in terminal
// [ ] total_profit (calculated on run, not a stored value, use custom alias )

// EX.
// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

// department_id, department_name, over_head_costs, product_sales

function productDep(){

}

// Create New Department
// [x] creates a new department, adds to the department database table

function newDep(){
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the department?"
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.deptName
            }, function(err){
                if (err) throw err;
                console.log("Department added!")
            }
        )
        connection.end();
    })
}