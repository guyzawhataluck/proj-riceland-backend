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
      contacted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )
  return Custumer
}
