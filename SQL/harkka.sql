CREATE DATABASE harkka;
USE harkka;

CREATE TABLE harkka.housing_types 
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    housing varChar(40) NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE harkka.users
(
    username varChar(10) NOT NULL PRIMARY KEY,
    password varChar(20) NOT NULL,
    name varChar(40),
    visiting_address varChar(50),
    billing_address varChar(50),
    role varChar(20) DEFAULT 'user',
    phonenumber char(10),
    email varChar(100),
    housing int,
    house_squares char(10),
    building_ground char(10),
    CONSTRAINT users_housing_fk FOREIGN KEY (housing) REFERENCES housing_types(id)
)
ENGINE = InnoDB;

CREATE TABLE harkka.states
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status varChar(20) NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE harkka.workorders
(
    order_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_username varChar(10) NOT NULL,
    work_description varChar(200) NOT NULL,
    address varChar(100) NOT NULL,
    city varChar(50) NOT NULL,
    orderdate DATE NOT NULL,
    startdate DATE,
    readydate DATE,
    accepteddate DATE,
    denieddate DATE,
    comment_of_work varChar(200),
    hours int,
    comment_of_used_material varChar(200),
    approx_budget int,
    status int NOT NULL DEFAULT 1,
    CONSTRAINT workorders_status_fk FOREIGN KEY (status) REFERENCES states(id),
    CONSTRAINT workorders_username_fk FOREIGN KEY (order_username) REFERENCES users(username)
)
ENGINE = InnoDB;