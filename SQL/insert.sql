INSERT INTO housing_types (housing) VALUES("Omakotitalo");
INSERT INTO housing_types (housing) VALUES("Vapaa-ajan asunto");
INSERT INTO housing_types (housing) VALUES("Maatila");

INSERT INTO states (status) VALUES("TILATTU");
INSERT INTO states (status) VALUES("ALOITETTU");
INSERT INTO states (status) VALUES("VALMIS");
INSERT INTO states (status) VALUES("HYVÄKSYTTY");
INSERT INTO states (status) VALUES("HYLÄTTY");
INSERT INTO states (status) VALUES("VASTATTU");
INSERT INTO states (status) VALUES("JÄTETTY");

INSERT INTO users(username, password, name, visiting_address, role) VALUES('admin', 'admin', 'Super Jumala', 'Jumalainentie 1', 'admin');
INSERT INTO users(username, password, name, visiting_address, role) VALUES('Yritys123', '123', 'Yritys oy', 'Yritystie 1', 'corp');
INSERT INTO users(username, password, name, visiting_address, housing) VALUES('Aleksi1', 'Aleksi2', 'Aleksi Partanen', 'Minna Canthin katu 1', 1);
INSERT INTO users(username, password, name, visiting_address) VALUES('moi123', 'moi1', 'Jonne Jokunen', 'Mannerheiminkatu 23');
INSERT INTO users(username, password, name, visiting_address) VALUES('Super23456', 'SuperPassword123', 'Jorma Penttinen', 'Pohjolankatu 43');
INSERT INTO users(username, password, name, visiting_address) VALUES('ISS', '1234', 'ISS Oy', 'Kaivotie 23');

INSERT INTO workorders(order_username, work_description, address, city, orderdate, startdate, readydate, status) VALUES('moi123', 'Ovien maalaaminen', 'Neulamäentie 23', 'KUOPIO', CURDATE(), '2018-11-20', '2018-11-28', 2);
INSERT INTO workorders(order_username, work_description, address, city, orderdate, startdate, readydate, status) VALUES('Aleksi1', 'Tää on testi', 'Vuorikatu 20', 'KUOPIO',CURRENT_DATE(), '2018-11-11', '2018-11-13', 2);
INSERT INTO workorders(order_username, work_description, address, city, orderdate, status) VALUES('Aleksi1', 'Seinien maalaaminen', "Kuopiolahdenkatu 23", "KUOPIO", CURDATE(), 7);
INSERT INTO workorders(order_username, work_description, address, city, orderdate, status) VALUES('Aleksi1', 'Oven avaus', "Vuorikatu 23", "KUOPIO", CURDATE(), 7);
INSERT INTO workorders(order_username, work_description, address, city, orderdate, status) VALUES('Aleksi1', 'Lehtien puhallus', "Suokatu 23", "KUOPIO", CURDATE(), 7);
INSERT INTO workorders(order_username, work_description, address, city, orderdate, answerdate, status) VALUES('moi123', 'Lipun nostaminen', "Savilahdenkatu 21", "KUOPIO", CURDATE(), '2018-11-24', 4);
INSERT INTO workorders(order_username, work_description, address, city, orderdate, answerdate, status) VALUES('Aleksi1', 'Lipun nostaminen', "Savilahdenkatu 21", "KUOPIO", CURDATE(), '2018-11-24', 5);
INSERT INTO workorders(order_username, work_description, address, city, orderdate) VALUES('Aleksi1', 'Seinien maalaaminen', "Lönnrootinkatu 1", "KUOPIO", CURDATE());
INSERT INTO workorders(order_username, work_description, address, city, orderdate) VALUES('Aleksi1', 'Tää on testi', 'Pohjolankatu 12', 'IISALMI', CURDATE());
INSERT INTO workorders(order_username, work_description, address, city, orderdate) VALUES('Aleksi1', 'Tää on testi', 'Harrinpolku 3', 'KIURUVESI', CURDATE());