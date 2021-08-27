CREATE USER 'gimbap'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'gimbap'@'%';
CREATE DATABASE gimbapDB;
USE gimbapDB;

DROP TABLE tbl_products;
DROP TABLE tbl_orders;