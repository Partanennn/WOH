CREATE DATABASE harkka;
USE harkka;

-- Foreign key postinumerolle

CREATE TABLE harkka.users
(
    tunnus varChar(10) NOT NULL PRIMARY KEY,
    salasana varChar(20) NOT NULL,
    enimi varChar(40) NOT NULL,
    snimi varChar(40) NOT NULL,
    postitoimipaikka varChar(20),
    katuosoite varChar(50),
    rooli varChar(5) DEFAULT 'user'
)

ENGINE = InnoDB;

CREATE TABLE harkka.tila
(
    users_tunnus varChar(10) NOT NULL PRIMARY KEY,
    onko_kirjautunut BOOLEAN DEFAULT 0,

    CONSTRAINT tila_users_tunnus_fk FOREIGN KEY (users_tunnus) REFERENCES users(tunnus)
)
ENGINE = InnoDB;
/*
CREATE TABLE harkka.posti
(
    postinro char(5) NOT NULL PRIMARY KEY,
    postitoimipaikka varChar(30) NOT NULL
)
ENGINE = InnoDB;
*/


INSERT INTO users VALUES('admin', 'admin', 'Super', 'Jumala', 'Taivas', 'Jumalainentie 1', 'admin');
INSERT INTO users (tunnus, salasana, enimi, snimi, postitoimipaikka, katuosoite) VALUES('Aleksi1', 'Aleksi2', 'Aleksi', 'Partanen', 'Kuopio', 'Minna Canthin katu 1');
INSERT INTO users (tunnus, salasana, enimi, snimi, postitoimipaikka, katuosoite) VALUES('moi123', 'moi1', 'Jonne', 'Jokunen', 'Helsinki', 'Mannerheiminkatu 23');
INSERT INTO users (tunnus, salasana, enimi, snimi, postitoimipaikka, katuosoite) VALUES('Super23456', 'SuperPassword123', 'Jorma', 'Penttinen', 'Iisalmi', 'Pohjolankatu 43');