module.exports = (sequelize, DataTypes) => {
  // tbl_product가 table의 이름(변수, 객체)
  // tbl_product.findAll()... 처럼 사용한다
  // tbl_products.findAll().. 과 같이 사용하면 안 됨!!!!!!!!
  const product = sequelize.define(
    "tbl_product",
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

  // tbl_table_orders와 tbl_product를 JOIN 할 수 있도록 설정할 예정
  // 상품1 : 주문서 -> 1 : N
  // tbl_table_orders의 to_pcode 칼럼과 현재 tbl_product와 연계하려고 한다!
  // 현재 테이블의 PK와 to_pcode를 연계하여 JOIN 수행할 준비
  product.associate = (models) => {
    product.hasMany(models.tbl_table_orders, { foreignKey: "to_pcode" });
  };

  return product;
};
