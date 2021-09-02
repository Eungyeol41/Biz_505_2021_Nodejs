USE nodeDB;

DROP TABLE tbl_products;
DROP TABLE tbl_table_orders;

DESC tbl_products;
DESC tbl_table_orders;

SELECT to_table_id, count(to_table_id)
FROM tbl_table_orders
WHERE to_pay IS NULL
GROUP BY to_table_id;