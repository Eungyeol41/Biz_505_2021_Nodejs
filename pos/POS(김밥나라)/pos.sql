CREATE USER 'gimbap'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'gimbap'@'%';
CREATE DATABASE gimbapDB;
USE gimbapDB;

DROP TABLE tbl_products;
DROP TABLE tbl_orders;

INSERT INTO tbl_products(p_code, p_name, p_price) 
VALUES('P0001', '1000원 김밥', 1000),
('P0002', '2000원 김밥', 2000),
('P0003', '돈까스 김밥', 3500),
('P0004', '참치 김밥', 3000),
('P0005', '라면', 2500),
('P0006', '치즈라면', 3000),
('P0007', '떡볶이', 4000),
('P0008', '어묵국', 3000),
('P0009', '쫄면', 4000),
('P0010', '김치볶음밥', 4500),
('P0011', '잔치국수', 4000),
('P0012', '제육볶음', 4000),
('P0013', '된장찌개', 5000),
('P0014', '오므라이스', 5500),
('P0015', '콜라/사이다', 1000);