const express = require("express");
const router = express.Router();
const moment = require("moment");

const { tbl_product, tbl_table_orders } = require("../models/index");
router.get("/order/:table_id", async (req, res) => {
  const table_id = req.params.table_id;
  console.log("table_id", table_id);

  // 비동기 방식으로 사용할 테니까 이게 끝날 때까지 다른 것 하지 마라!!
  // p_name 칼럼을 기준으로 오름차순 정렬
  const MENU = await tbl_product.findAll().then({ order: ["p_name", "ASC"] });

  res.render("order_view", { table_id, MENU });
});

/**
 * promise
 * 	지금까지 사용된 JS 코드는 대부분이 비동기 방식
 * 	코드(함수)들의 순서가 보장되지 않음
 * 	순서대로 작성된 코드가 자기 마음대로 순서가 실행되기 때문에 그 부분을 해결하기 위해서 callback이라는 개념으로 코딩을 함.
 *
 * 	call back이 계속 겹치는 상황이 발생할 수 있고 그러다보면 가독성이 굉장히 떨어지는 코드가 된다.
 * 		a(call()=>{
 * 			b(call()=>{
 *
 * 			})
 * 		})
 * 	JS에서는 이러한 상황을 'callback hell'이라고 한다.
 *
 * async await
 */
router.get("/order/:table_id/input/:menu_id", async (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  // await가 부착된 함수는 함수의 실행이 완료되고 menu 변수에 결과값이 담기기 전에는 다음 코드로 진행이 안 된다
  const menu = await tbl_product.findByPk(menu_id);

  // 선택된 상품이 order list에 있는 지를 검사하기 위해서 table_orders에서 데이터 SELECT하기
  const table_order = await tbl_table_orders.findOne({
    where: { to_table_id: table_id, to_pcode: menu_id, to_pay: null },
  });
  // table_order가 있으면!
  // 현재 테이블 번호와 같은 상품이 등록되어 있음!
  // findOne() 한 결과가 있으면 ( == NOT NULL이면 ) 수량만 ++하여 UPDATE를 수행하자
  if (table_order) {
    const order_qty = table_order.dataValues.to_qty;
    const order_seq = table_order.dataValues.to_seq;

    // SELECT 한 결과에 UPDATE 수행
    const result = await table_order.update(
      { to_qty: order_qty + 1 },
      { where: { to_seq: order_seq } }
    );

    res.json(result);
  } else {
    const table_order_menu = {
      to_table_id: table_id,
      to_pcode: menu_id,
      to_qty: 1,
      to_price: menu.p_price,
      to_date: moment().format("YYYY[-]MM[-]DD"),
      to_time: moment().format("HH:mm:ss"),
    };

    const result = tbl_table_orders.create(table_order_menu);
    res.json(result);
  }
});

// table layout에서 주문서 화면으로 이동할 때
//		현재 table에서 주문리스트가 있으면 화면에 출력하기 위한 Request 처리
router.get("/getorder/:table_id/getlist", (req, res) => {
  const table_id = req.params.table_id;
  //   const Op = Sequelize.Op;

  /**
   * 주문이 진행중인 상태에서는 orders들의 to_pay 칼럼이 null이고 결제가 완료된 상태는 to_pay에 문자열 P가 담기게 되므로
   * 	table layout에서 table을 선택하고 주문으로 들어오면 해당 table_id의 데이터들 중에서 to_pay가 null인 값만
   * 	SELECT하여 보여주기
   */
  tbl_table_orders
    .findAll({
      //   where: { to_table_id: table_id, to_pay: { [Op.eq]: null }} ,
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
