//biblioteka koji osigurava kreiranje samo jedne konekcije na bazu podataka za pojedinog korisnika
//next.js framework je javljao upozorenje da se stavraju duplicirane konekcije za isti objekt

const connectionString =
  "postgres://nada_svake_mame_admin:12345678@localhost:5432/postgres";
// Connection string je formata: postgres://<naziv uloge>:<lozinka uloge>@localhost:5432/<naziv baze>

const dbConnection = {
  connectionString,
  max: 1,
};

const DB_KEY = Symbol.for("MyApp.db");
const PGP_KEY = Symbol.for("MyApp.pgp");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;

if (!hasDb) {
  global[PGP_KEY] = require("pg-promise")({
    /*Init Option*/
  });
  global[DB_KEY] = global[PGP_KEY](dbConnection);
}

const singleton = {};
Object.defineProperty(singleton, "db", {
  get() {
    return global[DB_KEY];
  },
});

Object.defineProperty(singleton, "pgp", {
  get() {
    return global[PGP_KEY];
  },
});

Object.freeze(singleton);

module.exports = {
  pgp: singleton.pgp.pg.types.setTypeParser(1114, (s) => s),
  db: singleton.db,
};
