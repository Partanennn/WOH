CREATE DATABASE urheilu;
USE urheilu;

CREATE TABLE urheilu.posti
(
postinro char(5) NOT NULL PRIMARY KEY,
postitoimipaikka varChar(20) NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE urheilu.henkilo
(
henkiloid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
enimi varChar(40) NOT NULL,
snimi varChar(40) NOT NULL,
puhnro char(10),
postinro char(5),
onkoPelaaja bool,
syntymapaiva date,
joukkuenimi varChar(40),
CONSTRAINT henkilo_postinro_fk FOREIGN KEY (postinro) REFERENCES posti(postinro)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.pelaaja
(
pelaajaid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
henkiloid int NOT NULL,
pituus numeric(3),
paino numeric(3),
onkoMaalivahti bool,
CONSTRAINT pelaaja_henkiloid FOREIGN KEY (henkiloid) REFERENCES henkilo(henkiloid)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.joukkue
(
joukkueid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
nimi varChar(40) NOT NULL,
postinro char(5),
omistaja int,
CONSTRAINT joukkue_omistaja_fk FOREIGN KEY (omistaja) REFERENCES henkilo(henkiloid),
CONSTRAINT joukkue_postinro_fk FOREIGN KEY (postinro) REFERENCES posti(postinro)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.tilastot_joukkue
(
joukkueid int NOT NULL PRIMARY KEY,
kausi varChar(9),
voitot numeric(6),
haviot numeric(6),
tasapelit numeric(6),
ottelut numeric(6),
CONSTRAINT tilastot_joukkueid FOREIGN KEY (joukkueid) REFERENCES joukkue(joukkueid)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.tilastot_pelaaja
(
pelaajaid int NOT NULL PRIMARY KEY,
maalit numeric(4),
syotot numeric(4),
jaahyt numeric(5),
voitot numeric(4),
haviot numeric(4),
tasapelit numeric(4),
paastetyt_maalit numeric(4),
torjunnat numeric(4),
ottelut numeric(4),
kausi varChar(9),
CONSTRAINT tilastot_pelaaja_pelaajaid_fk FOREIGN KEY (pelaajaid) REFERENCES pelaaja(pelaajaid)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.sopimus
(
sopimusid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
henkiloid int NOT NULL,
vuodet varChar(30),
pvm date,
rooli varChar(15),
palkka numeric(7),
edut varChar(300),
CONSTRAINT sopimus_henkiloid_fk FOREIGN KEY (henkiloid) REFERENCES henkilo(henkiloid)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.areena
(
areenaid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
katsojalkm numeric(6),
nimi varChar(20),
rakennusvuosi numeric(4),
postinro char(5),
CONSTRAINT areena_postinro_fk FOREIGN KEY (postinro) REFERENCES posti(postinro)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.areenat_joukkueet
(
areenaid int,
joukkueid int,
kayttopaiva date,
kayttoaika_alkaa time,
kayttoaika_loppuu time,
CONSTRAINT areenat_joukkueet_pk PRIMARY KEY(areenaid, joukkueid),
CONSTRAINT areenat_areenaid_fk FOREIGN KEY (areenaid) REFERENCES areena(areenaid),
CONSTRAINT areenat_joukkueid_fk FOREIGN KEY (joukkueid) REFERENCES joukkue(joukkueid)
)
ENGINE = InnoDB;

CREATE TABLE urheilu.vuorot(
vuoroid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
areenaid int,
joukkueid int,
kayttopaiva date,
kayttoaika_alkaa time,
kayttoaika_loppuu time,
CONSTRAINT areenat_areenaid_fk FOREIGN KEY (areenaid) REFERENCES areena(areenaid),
CONSTRAINT areenat_joukkueid_fk FOREIGN KEY (joukkueid) REFERENCES joukkue(joukkueid))
ENGINE = InnoDB;
