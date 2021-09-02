module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "tbl_products",
    {
      p_code: {
        type: DataTypes.STRING(5),
        primaryKey: true, // PK 설정
      },
      p_name: {
        type: DataTypes.STRING,
        allowNull: false, // NOT NULL
      },
      p_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      p_rem: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );

  product.associate = (models) => {
    product.hasMany(models.tbl_orders, { foreignKey: "o_pcode" });
  };

  return product;
};
