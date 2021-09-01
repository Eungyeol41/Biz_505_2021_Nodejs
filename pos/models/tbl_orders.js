module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define("tbl_orders", {
    o_seq: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    o_table_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    o_pcode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    o_qty: { type: DataTypes.INTEGER },
    o_price: { type: DataTypes.INTEGER },
    o_date: { type: DataTypes.STRING(10) },
    o_time: { type: DataTypes.STRING(10) },
    o_pay: { type: DataTypes.STRING(1) },
    o_pay_type: { type: DataTypes.STRING(10) },
  });

  order.associate = (models) => {
    order.belongsTo(models.tbl_products, { foreignKey: "o_pcode" });
  };

  return order;
};
