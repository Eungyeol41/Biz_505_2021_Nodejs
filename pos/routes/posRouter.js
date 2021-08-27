const express = require("express");
const router = express.Router();
const { tbl_orders, tbl_products } = require("../models/index");

router.get("/detail", (req, res) => {
  const o_table = req.query.o_table;
  console.log("o_table", o_table);

  tbl_orders.findOne({ where: { o_table } }).then((result) => {
    if (result) {
      res.render("detail", { BBS: result });
    } else {
      res.render("order", "");
    }
  });
});

router.get("/list", (req, res) => {
  console.log("query값", req.query);
  const p_code = req.query.p_code;
  console.log("p_code", p_code);

  tbl_products.findOne({ where: { p_code }, include: { models: tbl_products } }).then((result) => {
    res.render("order", { BBS: result });
  });
});

router.get("/pay", (req, res) => {
  res.render("pay");
});

module.exports = router;
