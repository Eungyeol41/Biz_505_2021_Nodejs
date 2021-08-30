const express = require("express");
const router = express.Router();
const { tbl_orders, tbl_products } = require("../models/index");

router.get("/detail", (req, res) => {
  const { o_table } = req.query;
  console.log("detail-o_table", { o_table });
});

router.get("/list", (req, res) => {
  const { o_table } = req.query;

  tbl_products.findAndCountAll().then((result) => {
    res.render("order", { PR: result.rows, o_table: o_table });
  });
});
router.post("/list", (req, res) => {
  //   const p_name = req.body.p_name;
  //   console.log("p_name", p_name);
  //   const { table } = req.body;
  //   tbl_orders.insert({ table }).then((result) => {
  //     res.render("order", { table });
  //   });
});

router.get("/insert", (req, res) => {
  //   console.log("없다구");
  //   console.log("req의 body는?", req.query.p_code);
  let { p_code } = req.query;
  tbl_products.findByPk(p_code).then((result) => {
    // console.log("나오니", result.dataValues);
    // console.log("이거는", result.p_name);
    // return result;
    res.json(result);
  });
});

router.get("/pay", (req, res) => {
  res.render("pay");
});

module.exports = router;
