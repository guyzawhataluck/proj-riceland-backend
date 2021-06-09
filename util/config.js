require("dotenv").config()

module.exports = {
  development: {
    database: "riceland_admin",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: "mysql",
    port_db: "8889",
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
