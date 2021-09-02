module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define("tbl_orders", {
    o_seq: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    o_table_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
    }, // 주문이 진행중인 tableId
    o_pcode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    }, // 주문된 상품 코드
    o_qty: { type: DataTypes.INTEGER }, // 수량
    o_price: { type: DataTypes.INTEGER }, // 단가
    o_date: { type: DataTypes.STRING(10) }, // 주문한 시점의 날짜
    o_time: { type: DataTypes.STRING(10) },
    o_pay: { type: DataTypes.STRING(1) }, // 결제 여부
    o_pay_type: { type: DataTypes.STRING(10) }, // 결제 종류 ( 현금, 카드 )
  });

  orders.associate = (models) => {
    orders.belongsTo(models.tbl_products, { foreignKey: "o_pcode" });
  };

  return orders;
};
