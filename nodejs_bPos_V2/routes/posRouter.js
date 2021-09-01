const express = require("express");
const router = express.Router();
const moment = require("moment");

const { tbl_product, tbl_table_orders } = require("../models/index");
// 'localhost:3000/pos/order/3' 으로 URL 전송되어오면 숫자 3이 변수 table_id에 담겨서 오게 된다.
// 이 table_id는 req.params.table_id를 getter하여 값을 확인할 수 있다.
router.get("/order/:table_id", async (req, res) => {
  const table_id = req.params.table_id;
  console.log("table_id", table_id);

  // 비동기 방식으로 사용할 테니까 이게 끝날 때까지 다른 것 하지 마라!!
  // p_name 칼럼을 기준으로 오름차순 정렬
  const MENU = await tbl_product.findAll().then({ order: ["p_name", "ASC"] });

  res.render("order_view", { table_id, MENU });
});

// table_id와 menu_id가 Web으로부터 전달되어 왔다
// 현재 table에 손님이 있고 메뉴를 주문하기 시작했다.
// let menu_list = [];
router.get("/order/:table_id/input/:menu_id", (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  tbl_product.findByPk(menu_id).then((product) => {
    // menu_list.push(result);
    // console.log(menu_list);

    const table_orders = {
      to_table_id: table_id,
      to_pcode: menu_id,
      to_qty: 1,
      to_price: product.p_price,
      to_date: moment().format("YYYY[-]MM[-]DD"),
      to_time: moment().format("HH:mm:ss"),
    };

    tbl_table_orders.create(table_orders).then((result) => {
      res.json(result);
      //   tbl_table_orders
      //     .findAll({
      //       where: { to_table_id: table_id },
      //       include: [{ model: tbl_product, require: false }],
      //     })
      //     .then((order_list) => {
      //       res.json({ table_id, order_list });
      //     });
    });
  });

  //   const menu = {
  //     table_id,
  //     menu_id,
  //     menu_name: "돈까스 김밥",
  //     menu_price: 3500,
  //   };

  //   res.send("선택된 메뉴" + menu_id);
  //   res.json(menu);
});

// table layout에서 주문서 화면으로 이동할 때
//		현재 table에서 주문리스트가 있으면 화면에 출력하기 위한 Request 처리
router.get("/getorder/:table_id", (req, res) => {
  const table_id = req.params.table_id;
  //   const Op = Sequelize.Op;

  /**
   * 주문이 진행중인 상태에서는 orders들의 to_pay 칼럼이 null이고 결제가 완료된 상태는 to_pay에 문자열 P가 담기게 되므로
   * 	table layout에서 table을 선택하고 주문으로 들어오면 해당 table_id의 데이터들 중에서 to_pay가 null인 값만
   * 	SELECT하여 보여주기
   */
  tbl_table_orders
    .findAll({
      //   where: { to_table_id: table_id, to_pay: { [Op.is]: null }} ,
      where: { to_table_id: table_id, to_pay: null },
      include: [{ model: tbl_product, require: false }],
    })
    .then((result) => {
      res.json(result);
    });
});

router.get("/order/:order_seq/delete", (req, res) => {
  const order_seq = req.params.order_seq;

  tbl_table_orders
    .destroy({ where: { to_seq: order_seq } })
    .then(() => {
      res.send("OK!");
    })
    .catch(() => {
      res.send("FAIL");
    });
});

router.get("/paycomplete/:table_id", (req, res) => {
  const table_id = req.params.table_id;
  // table_id값을 받아와서 table을 update 한다.
  tbl_table_orders
    .update(
      // 주문 시에 결제가 완료된 표식으로 to_pay 칼럼에 문자열 P 업데이트
      { to_pay: "P" },
      { where: { to_table_id: table_id } }
    )
    .then(() => {
      res.send("OK");
    })
    .catch(() => {
      res.send("FAIL");
    });
});

module.exports = router;
