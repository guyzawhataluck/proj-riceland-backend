module.exports = (sequelize, Sequelize) => {
  const Custumer = sequelize.define(
    "custumer",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      tel: {
        type: Sequelize.STRING,
      },
      dest: {
        type: Sequelize.TEXT,
      },
      remark: {
        type: Sequelize.TEXT,
      },
      connected: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  )
  return Custumer
}
