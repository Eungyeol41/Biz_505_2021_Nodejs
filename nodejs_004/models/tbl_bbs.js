/**
 * MySQL Table 구조체 파일
 *  이 파일을 models/index.js가 실행되면서 자동으로 scan되고, 설정된 코드에 따라 table을 자동으로 만든다
 *
 *
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns
 */

module.exports = (sequelize, DataTypes) => {
  // sequelize를 사용하여 tbl_bbs table 생성
  const bbs = sequelize.define("tbl_bbs", {
    // b_id 칼럼을 정수형으로 선언
    b_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // b_date, b_time 칼럼을 문자열형 10자리로 선언
    b_date: {
      type: DataTypes.STRING(10),
      // Null값 금지
      allowNull: false,
    },
    b_time: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    // b_writer, b_subject 칼럼을 문자열형 기본으로 설정
    b_writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    b_subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // b_text 칼럼을 BLOB 타입으로 설정
    // BLOB : text보다 겁네 큰 칼럼
    b_text: {
      type: DataTypes.BLOB,
    },
    // b_count 칼럼을 정수형으로 선언
    b_count: {
      type: DataTypes.INTEGER,
    },
  });

  return bbs;
};
