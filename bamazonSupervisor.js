const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

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
    menu();
});

const table = new Table({
    head: ["Dept ID", "Department", "Over Head", "Sales", "Profit"],
    colWidths: [5, 20, 15, 10, 10],
});
// run
// [x] display menu (list)
//     [x] View Product Sales by Department
//     [x] Create New Department

function menu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create a New Department",
                "exit",
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
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
// [x] display table in terminal
// [ ] total_profit (calculated on run, not a stored value, use custom alias )

function productDep() {
    let query = "SELECT department_id, department_name, over_head_costs, product_sales FROM departments LEFT JOIN (SELECT department_name, SUM(product_sales) as department_sales FROM products GROUP BY department_name on departments.department_name = products.department_name";
    
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("Department List");
        res.forEach((res)=> {
            //in Customer app add sale count
            //Total profit is calculated
            table.push([
                `${res.department_id}`,
                `${res.department_name}`,
                `${res.over_head_costs}`,
                `${res.product_sales}`,
                `${res.product_sales - res.over_head_costs}`
            ]);
        });
        console.log(table.toString());
        connection.end();
    });
}

// Create New Department
// [x] creates a new department, adds to the department database table

function newDep() {
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the department?",
            },
            {
                name: "overHead",
                type: "number",
                message: "What is the over head for this department?"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: answer.deptName,
                    over_head_costs: answer.overHead
                },
                function (err) {
                    if (err) throw err;
                    console.log("Department added!");
                }
            );
            connection.end();
        });
}
