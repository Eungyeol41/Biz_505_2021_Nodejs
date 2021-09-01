module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "tbl_products",
    {
      p_code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
      },
      p_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      p_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      p_rem: { type: DataTypes.STRING(255) },
    },
    { timestamps: false } // createdAt, updatedAt 만들지 않기
  );

  product.associate = (models) => {
    product.hasMany(models.tbl_orders, { foreignKey: "o_pcode" });
  };

  return product;
};
