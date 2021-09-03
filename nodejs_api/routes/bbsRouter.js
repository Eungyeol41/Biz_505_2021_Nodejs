const express = require("express");
const router = express.Router();
const bbs = require("../models/tbl_bbs");

router.get("/push", (req, res) => {
  const bbsVO = new bbs({
    b_date: "2120-09-03",
    b_time: "11:28:00",
    b_writer: "피코파크",
    b_subject: "오늘 점심 맛이뜸",
    b_text: "오늘 놀러갈거임",
  });

  // 객체를 먼저 만들고 난 후 save
  bbsVO.save((err) => {
    if (err) {
      console.log(err);
    }
    res.send("OK ok");
  });
});

router.get("/push_find", async (req, res) => {
  const bbsVO = {
    b_date: "2021-09-03",
    b_time: "11:43:00",
    b_writer: "피코파크2",
    b_subject: "내일은 주말이다!!",
    b_text: "하지만 일단 오늘 놀러갈거임",
  };
  //   await bbs.insertMany(bbsVO);
  await bbs.create(bbsVO);
  const result = await bbs.find();
  await res.json(result);
});

module.exports = router;
