require("dotenv").config()

module.exports = {
  development: {
    database: "riceland_admin",
    username: "root",
    password: "Palm2393",
    host: "localhost",
    dialect: "mysql",
    port_db: "3306",
    port: 3000,
  },
  test: {
    environment: process.env.NODE_ENV,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port_db: process.env.DB_PORT,
    port: process.env.PORT,
  },
  production: {
    environment: process.env.NODE_ENV,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port_db: process.env.DB_PORT,
    port: process.env.PORT,
  },
}
