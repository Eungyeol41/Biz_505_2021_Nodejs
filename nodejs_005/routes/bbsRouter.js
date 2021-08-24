const express = require("express");
const router = express.Router();
// JS, nodejs에서 날짜 시간을 취급하는 가장 많이 사용되는 middleware
const moment = require("moment");

const { tbl_bbs } = require("../models/index");

// 설정된 root get은 URL에서 localhost:3000/bbs/write 요청할 때
router.get("/write", (req, res) => {
  const BBS = {
    b_date: moment().format("YYYY[-]MM[-]DD"),
    b_time: moment().format("HH:mm:ss"),
  };
  res.render("write", { BBS });
});
router.post("/write", (req, res) => {
  // form을 통해서 POST로 전송되어 온 데이터는 req.body에 담겨서 온다.
  // 이 때 버튼도 form 안에 넣어줘야 한다.
  tbl_bbs.create(req.body).then((result) => res.redirect("/"));
});

module.exports = router;
