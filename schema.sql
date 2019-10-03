CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Spalding Basketball", "Sports", 20, 100),
("Roku 4", "Electronics", 49.50, 80),
("Raspberry Pi", "Electronics", 65.75, 300),
("Purple Punch OG", "Agriculture", 15, 30),
("Sports Bag", "Sports", 18.50, 120),
("Daily Gummy Vitamin (20 count)", "Health", 22.35, 200),
("Wheyabolic Protein Powder", "Health", 79, 100),
("Wedding Cake Kush", "Agriculture", 20, 60),
("BitCoin", "Cryptocurrency", 8054, 15);