DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,4) NULL,
    stock_quantity DECIMAL(10,4) NULL,
    product_sales DECIMAL(50, 4) NULL,
    PRIMARY KEY (item_id)
);

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

SELECT * FROM products;
