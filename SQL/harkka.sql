CREATE DATABASE harkka;
USE harkka;

-- Foreign key postinumerolle

CREATE TABLE harkka.users
(
    username varChar(10) NOT NULL PRIMARY KEY,
    password varChar(20) NOT NULL,
    name varChar(40) NOT NULL,
    address varChar(50),
    city varChar(20),
    role varChar(20) DEFAULT 'user',
    logged BOOLEAN DEFAULT 0
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
    address varChar(50) NOT NULL,
    city varChar(20) NOT NULL,
    start_time DATE NOT NULL,
    end_time DATE NOT NULL,
    description varChar(200),
    status varChar(20),
    price DECIMAL(7, 2), /*Jos saa arvon 0,01, niin se on tarjouspyyntö*/
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
INSERT INTO users(username, password, name, city, address, role) VALUES('admin', 'admin', 'Super Jumala', 'Taivas', 'Jumalainentie 1', 'admin');
INSERT INTO users(username, password, name, city, address) VALUES('Aleksi1', 'Aleksi2', 'Aleksi Partanen', 'Kuopio', 'Minna Canthin katu 1');
INSERT INTO users(username, password, name, city, address) VALUES('moi123', 'moi1', 'Jonne Jokunen', 'Helsinki', 'Mannerheiminkatu 23');
INSERT INTO users(username, password, name, city, address) VALUES('Super23456', 'SuperPassword123', 'Jorma Penttinen', 'Iisalmi', 'Pohjolankatu 43');
INSERT INTO users(username, password, name, city, address, role) VALUES('ISS', '1234', 'ISS Oy', 'Kuopio', 'Kaivotie 23', 'corporation');