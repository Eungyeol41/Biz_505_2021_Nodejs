/**
 * mongoose를 사용하여 mongoDB 핸들링하기
 *
 * mongoose는 mongoDB를 ORM 방식으로 사용하기 위한 middleware
 * mongoose를 사용하려면 먼저 Schema 선언
 * NoSQL인 mongoDB를 마치 스키마가 있는 RDBMS처럼 사용할 수 있도록 하기 위한 조치
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema type
 * String, Number, Date, Buffer, Boolean, Mixed, Object, Array 타입 등이 있다.
 */

const bbs = Schema({
  b_date: String,
  b_time: String,
  b_writer: String,
  b_subject: String,
  b_text: String,
  b_comment: {
    c_date: String,
    c_time: String,
    c_writer: String,
    c_text: String,
  },
});

// tbl_bbs라는 컬렉션을 생성할 준비를 하라
module.exports = mongoose.model("tbl_bbs", bbs);
