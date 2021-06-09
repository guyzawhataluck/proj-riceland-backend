module.exports = (sequelize, Sequelize) => {
  const Specification = sequelize.define(
    "specification",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      sp_name_en: {
        type: Sequelize.STRING,
      },
      sp_name_ch: {
        type: Sequelize.STRING,
      },
      sp_detail_en: {
        type: Sequelize.STRING,
      },
      sp_detail_ch: {
        type: Sequelize.STRING,
      }
      // product_id: {
      //   type: Sequelize.INTEGER,
      // }
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )
  return Specification
}
