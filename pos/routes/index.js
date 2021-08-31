var express = require("express");
var router = express.Router();

const { tbl_orders } = require("../models/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  const prefix = "2021";
  const precode = "000000";

  let b_code = prefix + precode;
  let mcode = b_code.substring(4);
  mcode = parseInt(mcode) + 1;
  mcode = "00000" + mcode;
  mcode = mcode.substring(mcode.length - 6);
  console.log("mcode", mcode);

  b_code = prefix + mcode;
  console.log("b_code", b_code);

  tbl_orders.findAndCountAll().then((result) => {
    res.render("index", { OR: result.rows });
  });
});

module.exports = router;
