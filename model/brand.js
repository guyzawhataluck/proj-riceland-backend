module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define(
    "brand",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      brand_name_en: {
        type: Sequelize.STRING,
      },
      brand_name_ch: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )
  return Brand
}
