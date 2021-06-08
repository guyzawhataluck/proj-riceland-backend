module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define(
    "admin",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      ad_username: {
        type: Sequelize.STRING,
      },
      ad_password: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  )
  return Admin
}
