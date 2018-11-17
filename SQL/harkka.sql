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

INSERT INTO housing_types (housing) VALUES("Omakotitalo");
INSERT INTO housing_types (housing) VALUES("Vapaa-ajan asunto");
INSERT INTO housing_types (housing) VALUES("Maatila");

INSERT INTO states (status) VALUES("TILATTU");
INSERT INTO states (status) VALUES("ALOITETTU");
INSERT INTO states (status) VALUES("VALMIS");
INSERT INTO states (status) VALUES("HYVÄKSYTTY");
INSERT INTO states (status) VALUES("HYLÄTTY");
INSERT INTO states (status) VALUES("VASTATTU");
INSERT INTO states (status) VALUES("TARJOUS");

INSERT INTO users(username, password, name, visiting_address, role) VALUES('admin', 'admin', 'Super Jumala', 'Jumalainentie 1', 'admin');
INSERT INTO users(username, password, name, visiting_address, housing) VALUES('Aleksi1', 'Aleksi2', 'Aleksi Partanen', 'Minna Canthin katu 1', 1);
INSERT INTO users(username, password, name, visiting_address) VALUES('moi123', 'moi1', 'Jonne Jokunen', 'Mannerheiminkatu 23');
INSERT INTO users(username, password, name, visiting_address) VALUES('Super23456', 'SuperPassword123', 'Jorma Penttinen', 'Pohjolankatu 43');
INSERT INTO users(username, password, name, visiting_address) VALUES('ISS', '1234', 'ISS Oy', 'Kaivotie 23');

INSERT INTO workorders(order_username, work_description, address, city, orderdate, startdate, readydate, status) VALUES('moi123', 'Ovien maalaaminen', 'Neulamäentie 23', 'KUOPIO', CURDATE(), '2018-11-20', '2018-11-28', 2);
INSERT INTO workorders(order_username, work_description, address, city, orderdate, startdate, readydate, status) VALUES('Aleksi1', 'Tää on testi', 'Vuorikatu 20', 'KUOPIO',CURRENT_DATE(), '2018-11-11', '2018-11-13', 2);
INSERT INTO workorders(order_username, work_description, address, city, orderdate) VALUES('Aleksi1', 'Seinien maalaaminen', "Suokatu 23", "KUOPIO", CURDATE());
INSERT INTO workorders(order_username, work_description, address, city, orderdate) VALUES('Aleksi1', 'Tää on testi', 'Pohjolankatu 12', 'IISALMI', CURDATE());
INSERT INTO workorders(order_username, work_description, address, city, orderdate) VALUES('Aleksi1', 'Tää on testi', 'Harrinpolku 3', 'KIURUVESI', CURDATE());
