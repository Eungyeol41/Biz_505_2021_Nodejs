const express = require("express");
const router = express.Router();
const { tbl_orders, tbl_products } = require("../models/index");

router.get("/detail", (req, res) => {
  const { o_table } = req.query;
  console.log("detail-o_table", { o_table });
});

router.get("/list", (req, res) => {
  const { o_table } = req.query;
  const { table } = req.body;

  tbl_products.findAll().then((result) => {
    res.render("order", { PR: { table }, o_table: o_table });
  });
});
router.post("/list", (req, res) => {
  console.log("req의 body는?", req.body);
  const p_name = req.body.p_name;
  console.log("p_name", p_name);

  const { table } = req.body;
  tbl_orders.insert({ table }).then((result) => {
    res.render("order", { table });
  });
});

router.get("/pay", (req, res) => {
  res.render("pay");
});

module.exports = router;
