const total_pay = {};

const appear_list = (order_list) => {
  const menulist = document.querySelector("table.menu_table tbody");
  const menulist_tr = document.querySelector("table.menu_table tbody tr");
  if (menulist_tr) {
    menulist_tr.forEach((tag) => {
      menulist.removeChild(tag);
    });
  }

  total_pay.total = 0;

  const orders = order_list.map((order) => {
    const order_list = [
      order.o_pcode,
      order.tbl_product.p_name,
      order.o_qty,
      order.o_price,
      order.o_qty * order.o_price,
      "X",
    ];
    total_pay.total += order.o_qty * order.o_price;

    const order_td = order_list.map((menu) => {
      const td = document.createElement("TD");
      td.innerText = menu;
      td.dataset.order_seq = order.o_seq;

      return td;
    });

    const order_tr = document.createElement("TR");
    order_tr.append(...order_td);

    return order_tr;
  });

  document.querySelector("table.menu_table tbody").append(...orders);

  const pay_td = document.querySelector("#total");
  pay_td.innerText = total_pay.total;
}; // list에 추가하기

const getOrdres = (table_id) => {
  fetch(`/pos/`);
};

const order_input_server = (table_id, menu_id) => {
  fetch(`/pos/order/${table_id}/input/${menu_id}`)
    .then((res) => res.json())
    .then((result) => {
      getOrders(table_id);
    });
}; // fetch로 server에 데이터 요청하기
