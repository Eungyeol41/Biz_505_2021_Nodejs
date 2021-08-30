const express = require("express");
const router = express.Router();
const { tbl_orders, tbl_products } = require("../models/index");

router.get("/detail", (req, res) => {
  const { o_table } = req.query;
  console.log("detail-o_table", { o_table });
  tbl_orders.findAndCountAll().then((result) => {
	  res.render("detail", { OR : result.rows, o_table : o_table });
  })
});

router.get("/list", (req, res) => {
  const { o_table } = req.query;

  tbl_products.findAndCountAll().then((result) => {
    res.render("order", { PR: result.rows, o_table: o_table });
  });
});

router.get("/insert", (req, res) => {
  let { p_code } = req.query;
  tbl_products.findByPk(p_code).then((result) => {
    // console.log("나오니", result.dataValues);
    // console.log("이거는", result.p_name);
    // return result;
    res.json(result);
  });
});

module.exports = router;
