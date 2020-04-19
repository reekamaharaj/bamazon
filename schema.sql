-- drop database if it exists
DROP DATABASE IF EXISTS bamazonDB;
-- create new database
CREATE database bamazonDB;
-- use database
USE bamazonDB;
-- create table for products
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(50,2) NULL,
  stock_quantity DECIMAL(50,2) NULL,
  product_sales DECIMAL(50, 2) NULL,
  PRIMARY KEY (item_id)
);
-- initial product informtaion added to products table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Blu-Ray/DVD', 'Books/Movies/Music', 24.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Book', 'Books/Movies/Music', 14.99, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('CD', 'Books/Movies/Music', 14.99, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Game controller', 'Video Games', 29.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Gaming keyboard', 'Video Games', 99.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Wireless earbuds', 'Electronics', 124.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('32" TV', 'Electronics', 299.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Surge Protector', 'Electronics', 29.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('pens', 'Arts & Crafts', 5.99, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('paper', 'Arts & Crafts', 29.99, 157);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('ribbon', 'Arts & Crafts', 3.99, 140);
-- show the full products table
SELECT * FROM products;
-- use database
USE bamazonDB;
-- create table for departments
CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(50,2) NULL,
    PRIMARY KEY (department_id)
);
-- initial department information added to departments table
INSERT INTO departments (department_name, over_head_costs)
VALUES ('Books/Movies/Music', 5000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Video Games', 12000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Electronics', 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Arts & Crafts', 3500);
-- show the full departments table
SELECT * FROM departments;

-- use data base
USE bamazonDB;
-- show the products and department tables
SELECT * FROM products;
SELECT * FROM departments;