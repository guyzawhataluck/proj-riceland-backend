module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      pd_title_en: {
        type: Sequelize.STRING,
      },
      pd_title_ch: {
        type: Sequelize.STRING,
      },
      pd_content_en: {
        type: Sequelize.TEXT,
      },
      pd_content_ch: {
        type: Sequelize.TEXT,
      },
      pd_img_url: {
        type: Sequelize.TEXT,
      },
      is_related_product: {
        type: Sequelize.BOOLEAN,
      }
      // brand_id: {
      //   type: Sequelize.INTEGER,
      // }
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )
  return Product
}
