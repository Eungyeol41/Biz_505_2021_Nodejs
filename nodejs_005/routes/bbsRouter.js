const express = require("express");
const router = express.Router();
// JS, nodejs에서 날짜 시간을 취급하는 가장 많이 사용되는 middleware
const moment = require("moment");
const { route } = require(".");

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

router.get("/detail", (req, res) => {
  // list에서 게시물을 클릭했을 때 게시물의 id값(b_id)를 queryString으로 가지고 여기에 도달한다
  const b_id = req.query.b_id;

  // PK를 기준으로 1개의 데이터를 추출하라
  tbl_bbs.findByPk(b_id).then((result) => {
    console.table(result);
    // res.json(result);
    res.render("detail", { BBS: result });
  });
});

router.get("/delete", (req, res) => {
  const b_id = req.query.b_id;
  //
  tbl_bbs.destroy({ where: { b_id } }).then(() => {
    res.redirect("/");
  });
});

router.get("/update", (req, res) => {
  const b_id = req.query.b_id;

  // PK 또는 일반 칼럼에 조건을 주어 1개의 데이터를 SELECT 할 때
  // tbl_bbs.findOne({ where: { b_id } });

  tbl_bbs.findByPk(b_id).then((result) => {
    res.render("write", { BBS: result });
  });
});
router.post("/update", (req, res) => {
  const b_id = req.query.b_id;
  // body에 b_id가 추가됨.
  req.body.b_id = b_id;

  tbl_bbs.update(req.body, { where: { b_id } }).then((result) => {
    res.redirect("/");
  });
});

module.exports = router;
