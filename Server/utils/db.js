import knex from "knex";
import mysql2 from "mysql2";

export default knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "kahoot",
  },
  pool: { min: 0, max: 10 },
});
