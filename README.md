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
Nakon uspješne instalacije baze podataka, potrebno je kreirati sledeće tabele koje ćemo koristiti u projektu:

CREATE TABLE users (
	id serial PRIMARY KEY,
	firstName VARCHAR ( 50 ),
	lastName VARCHAR ( 50 ),
        email VARCHAR ( 255 ),
        password text,
	jmbg VARCHAR ( 255 ) UNIQUE NOT NULL,
	city VARCHAR ( 255 ),
	role_id int NOT NULL
);

CREATE TABLE diplomaRequest (
	id serial PRIMARY KEY,
	user_id int,
	extension VARCHAR(255),
	file_name VARCHAR(255),
	file bytea,
	isFinished boolean
);


CREATE TABLE diplomaVerification (
	id serial PRIMARY KEY,
	diploma_id int,
	hash text,
	isVerified boolean
);

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
