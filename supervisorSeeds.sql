USE bamazonDB;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(10,4) NULL,
    product_sales DECIMAL(10,4) NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name)
VALUES ('Books/Movies/Music');

INSERT INTO departments (department_name)
VALUES ('Video Games');

INSERT INTO departments (department_name)
VALUES ('Electronics');

INSERT INTO departments (department_name)
VALUES ('Arts & Crafts');

SELECT * FROM departments;
