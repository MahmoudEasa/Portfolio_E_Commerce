-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS ecommerce_db;
CREATE USER IF NOT EXISTS 'ecommerce_dev'@'localhost' IDENTIFIED BY 'ecommerce_pwd';
GRANT ALL PRIVILEGES ON `ecommerce_db`.* TO 'ecommerce_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'ecommerce_dev'@'localhost';
FLUSH PRIVILEGES;
