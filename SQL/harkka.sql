CREATE DATABASE harkka;
USE harkka;

CREATE TABLE harkka.users
(
    username varChar(10) NOT NULL PRIMARY KEY,
    password varChar(20) NOT NULL,
    name varChar(40),
    visiting_address varChar(50),
    billing_address varChar(50),
    role varChar(20) DEFAULT 'user'
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
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_username varChar(10) NOT NULL,
    work_description varChar(200) NOT NULL,
    orderdate DATE NOT NULL,
    startdate DATE,
    readydate DATE,
    accepteddate DATE,
    denieddate DATE,
    comment_of_work varChar(200),
    hours int,
    comment_of_used_material varChar(200),
    approx_budget int,
    CONSTRAINT workorders_username_fk FOREIGN KEY (order_username) REFERENCES users(username)
)
ENGINE = InnoDB;



INSERT INTO states (status) VALUES("TILATTU");
INSERT INTO states (status) VALUES("ALOITETTU");
INSERT INTO states (status) VALUES("VALMIS");
INSERT INTO states (status) VALUES("HYVÄKSYTTY");
INSERT INTO states (status) VALUES("HYLÄTTY");
INSERT INTO states (status) VALUES("VASTATTU");
INSERT INTO states (status) VALUES("TARJOUS");

INSERT INTO users(username, password, name, visiting_address, role) VALUES('admin', 'admin', 'Super Jumala', 'Jumalainentie 1', 'admin');
INSERT INTO users(username, password, name, visiting_address) VALUES('Aleksi1', 'Aleksi2', 'Aleksi Partanen', 'Minna Canthin katu 1');
INSERT INTO users(username, password, name, visiting_address) VALUES('moi123', 'moi1', 'Jonne Jokunen', 'Mannerheiminkatu 23');
INSERT INTO users(username, password, name, visiting_address) VALUES('Super23456', 'SuperPassword123', 'Jorma Penttinen', 'Pohjolankatu 43');
INSERT INTO users(username, password, name, visiting_address, role) VALUES('ISS', '1234', 'ISS Oy', 'Kaivotie 23', 'corporation');

INSERT INTO workorders(order_username, work_description, orderdate) VALUES("Aleksi1", "Tää on testi", CURDATE());
