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
    let query = `SELECT
        departments.department_id,
        departments.department_name,
        departments.over_head_costs,
        intermediate.product_sales
    FROM
        departments
        JOIN (
        SELECT
            departments.department_name,
            Sum(products.product_sales) AS product_sales
        FROM
            products
            JOIN departments ON products.department_name = departments.department_name
        GROUP BY
            departments.department_name
        ) AS intermediate ON departments.department_name = intermediate.department_name`;

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
