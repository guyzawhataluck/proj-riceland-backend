module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "order",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      size: {
        type: Sequelize.STRING,
      },
      mat_bag: {
        type: Sequelize.STRING,
      },
      custumer_id: {
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      // publish: {
      //   type: Sequelize.ENUM,
      //   field: "publish",
      //   values: ["banner", "facebook", "youtube"],
      // },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  )
  return Order
}
