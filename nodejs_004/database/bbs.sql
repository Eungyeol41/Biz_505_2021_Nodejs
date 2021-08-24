-- % : 어디에서나 접근 가능
CREATE USER 'node'@'%' IDENTIFIED BY '12341234';

-- 모든 권한 부여
GRANT ALL PRIVILEGES ON *.* TO 'node'@'%';

CREATE DATABASE nodeDB;

USE nodeDB;
DESC tbl_bbs;
DROP TABLE tbl_bbs;

SELECT * FROM tbl_bbs;