Sistem za verifikaciju digitalnih diploma

Prilikom preuzimanja projekta, potrebno je da pokrenete sledeće komande zbog instaliranja svih potrebnih paketa:

npm install
npm install ganache-cli
npm install ganache --global

Nakon instalacije paketa, potrebno je da unutar javascript fajla Schema.js podesite gasPrice vrijednost:
Schema.js
gasPrice: 3000000000

Podešavanje PostgreSQL:
Instalacija PostgreSQL baze se nalazi na linku: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
Unutar fajla connection.js potrebno je definisati korisničko ime naloga, šifru i port na kojem radi PostgreSql baza podataka.

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dvbc",
  password: "posgres",
  port: 5432,
});

Podešavanje Ganache CLI:
Instalacija Ganache CLI se nalazi na linku: https://trufflesuite.com/ganache/
