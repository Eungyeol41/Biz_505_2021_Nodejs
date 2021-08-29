const express = require("express");
const router = express.Router();
const { tbl_orders, tbl_products } = require("../models/index");

router.get("/detail", (req, res) => {
  const {o_table} = req.query;
  console.log("detail-o_table", {o_table});
});

router.get("/list", (req, res) => {
  const {o_table} = req.query
  
  tbl_products.findAndCountAll().then(result=>{
	  res.render("order", {PRODUCT:result.rows, o_table: o_table})
  })
	// tbl_products.findAll({ include : [{model : tbl_orders}] }).then(result=>{
	// 	res.render("order", {PRODUCT:result, o_table: o_table})
	// })
});

router.get("/pay", (req, res) => {
  res.render("pay");
});

router.get("/listPug", (req, res) => {
	tbl_products.findAndCountAll().then(result=>{
		res.render("list", {vo : result.rows});
	});
})

module.exports = router;
