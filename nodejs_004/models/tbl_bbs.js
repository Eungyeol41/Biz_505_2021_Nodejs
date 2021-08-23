const bbs = (sequelize, DataTypes) => {
  // sequelize를 사용하여 tbl_bbs table 생성
  const bbs = sequelize.define("tbl_bbs", {
    id: {
      type: DataTypes.INTEGER,
    },
  });
};

module.export = bbs;
