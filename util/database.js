const Sequelize = require("sequelize")
const configJson = require("./config")

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development"
const config = configJson[env]

console.log("this is the environment: ", env)
console.log(config)

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port_db,
    dialect:
      config.dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: false,
  }
)

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ alter: true })
    console.log("Connection has been established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

const db = {}

db.sequelize = sequelize

//! Models
db.admin = require("../model/admin")(sequelize, Sequelize)
db.brand = require("../model/brand")(sequelize, Sequelize)
db.custumer = require("../model/custumer")(sequelize, Sequelize)
db.news = require("../model/news")(sequelize, Sequelize)
db.order = require("../model/order")(sequelize, Sequelize)
db.product = require("../model/product")(sequelize, Sequelize)
db.specification = require("../model/specification")(sequelize, Sequelize)

//Relations
db.custumer.hasMany(db.order, {
  foreignKey: "custumer_id",
  onDelete: "cascade"
})

//db.order.belongsTo(db.custumer)

db.product.hasMany(db.order, {
  foreignKey: "product_id",
  onDelete: "cascade"
})

db.order.belongsTo(db.product)

db.product.hasMany(db.specification, {
  foreignKey: "product_id",
  onDelete: "cascade"
})

//db.specification.belongsTo(db.product)

db.brand.hasMany(db.product, {
  foreignKey: "brand_id"
})

db.product.belongsTo(db.brand)
//! Relations
// db.articles.hasMany(db.sub_article, {
//   sourceKey: "id",
//   foreignKey: "id_article",
//   onDelete: "cascade",
// })

// db.poll.hasMany(db.poll_choice, {
//   sourceKey: "id",
//   foreignKey: "id_poll",
//   onDelete: "cascade",
// })

module.exports = db
