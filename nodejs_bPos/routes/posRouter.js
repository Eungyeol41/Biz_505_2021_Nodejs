const express = require("express");
const router = express.Router();

// 'localhost:3000/pos/order/3' 으로 URL 전송되어오면 숫자 3이 변수 table_id에 담겨서 오게 된다.
// 이 table_id는 req.params.table_id를 getter하여 값을 확인할 수 있다.
router.get("/order/:table_id", (req, res) => {
  const table_id = req.params.table_id;
  console.log("table_id", table_id);

  //   res.send(table_id);
  //   res.render("order_view", { table_id: table_id });
  res.render("order_view", { table_id });
});

router.get("/order/:table_id/input/:menu_id", (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  const menu = {
    table_id,
    menu_id,
    menu_name: "돈까스 김밥",
    menu_price: 3500,
  };

  //   res.send("선택된 메뉴" + menu_id);
  res.json(menu);
});

module.exports = router;
