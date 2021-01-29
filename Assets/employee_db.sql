-- Drops the employees_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the "employees_db" database --
CREATE DATABASE employee_db;

-- Makes it so all of the following code will affect employees_db --
USE employee_db;

-- Creates the table "people" within employees_db --
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  -- Makes a string column called "name" which cannot contain null --
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL, 
  department_id INT NOT NULL
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  -- Makes a string column called "name" which cannot contain null --
  first_name VARCHAR(30) NOT NULL,
  name_name VARCHAR(30) NOT NULL,
  role_id int NOT NULL, 
  manager_id INT NOT NULL
);

