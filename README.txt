Sovellus toimii firefox selaimessa



Että react-tiedostot saadaan aukaistua, pitää asentaa lokaali http serveri Node.js:llä. Se onnistuu seuraavasti:
1. Avaa command prompt
2. Lataa http-server kirjoittamalla: npm install -g http-server
3. Mene command promptin kautta kansioon, jossa nämä tiedostot sijaitsevat.
4. Käynnistä serveri kirjoittamalla command promptiin: http-server -c-1
5.Nyt löydät tiedostot kirjoittamalla selaimeen localhost:8080. Aloita aukaisemalla etusivu.html