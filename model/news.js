module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define(
    "news",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      news_title_en: {
        type: Sequelize.STRING,
      },
      news_title_ch:{
        type: Sequelize.STRING,
      },
      news_content_en:{
        type: Sequelize.TEXT,
      },
      news_content_ch: {
        type: Sequelize.TEXT,
      },
      news_date: {
        type: Sequelize.DATE,
      },
      news_img_url: {
        type: Sequelize.TEXT,
      },
      // chart: {
      //   type: Sequelize.ENUM,
      //   field: "chart",
      //   values: ["pie", "bar"],
      //   },
      // image_url: {
      //   type: Sequelize.TEXT,
      // },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )
  return News
}
