const express = require("express");
const { UPDATE } = require("sequelize/types/lib/query-types");
const router = express.Router();

const { tbl_bbs } = require("../models/index");

router.get("/write", (req, res) => {
  res.render("write");
});
router.post("/write", (req, res) => {
  tbl_bbs.create(req.body).then((result) => {
    res.json(result);
  });
});

router.get("/update", (req, res) => {
  let seq = req.query.seq;
  console.log("seq 값은?", seq);

  tbl_bbs.findByPk(seq).then((result) => {
    console.log("findByPk", result);
    res.render("update", { BBS: result });
  });
});
// router.post("/update", (req, res) => {
//   const b_id = req.query.b_id;
//   req.body.b_id = b_id;
// });

module.exports = router;
