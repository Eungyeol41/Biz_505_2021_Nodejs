var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/loc", (req, res) => {
  res.render("loc");
});

router.get("/deli", (req, res) => {
  res.render("deli");
});

router.get("/go", (req, res) => {
  res.render("go");
});
module.exports = router;
